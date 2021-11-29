import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Session } from "../../types/types";
import { Button } from "react-bootstrap";

import "./sessionPageStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const SESSIONS_PER_PAGE = 10;

export function Sessions() {
  const navigate = useNavigate();
  const { getAllSessions, deleteSessionById } = useApi();
  const [sessionsArray, setSessionArray] = useState<Session[]>();

  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  async function load() {
    const data = await getAllSessions();
    data?.sort(function (a, b) {
      return (new Date(a.date) as any) - (new Date(b.date) as any);
    });
    setSessionArray(data);
    if (data) {
      calculateNumberOfPages(data);
    }
  }

  function calculateNumberOfPages(data = sessionsArray) {
    if (!data) return;
    setNumberOfPages(Math.ceil(data?.length / SESSIONS_PER_PAGE));
  }

  function renderSessionList() {
    const pageIndex = (selectedPage - 1) * SESSIONS_PER_PAGE;
    const sessionsToRender = sessionsArray?.slice(
      pageIndex,
      pageIndex + SESSIONS_PER_PAGE
    );
    if (!sessionsToRender) return;
    return sessionsToRender.map((session) => {
      return (
        <tr key={session.id} className="border-bottom border-primary">
          <td>{session.date}</td>
          <td>{session.timeStart}</td>
          <td>{session.timeEnd}</td>
          <td>{session.room?.name}</td>
          <td>{session.movie?.title}</td>
          <td>{"R$ " + session.ticketCost.toFixed(2)}</td>
          <td>{session.animationType}</td>
          <td>{session.audioType}</td>
          <td>
            <button
              className="btn btn-sm ms-2 text-primary"
              onClick={() => handleDeleteSession(session)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      );
    });
  }

  function renderPagination() {
    return Array.from({ length: numberOfPages }).map((_, index) => {
      const page = index + 1;
      return (
        <button
          key={index}
          className={
            "btn btn-outline-primary " + (page === selectedPage ? "active" : "")
          }
          onClick={() => setSelectedPage(page)}
        >
          {page}
        </button>
      );
    });
  }

  async function handleDeleteSession(session: Session) {
    const confirmDelete = window.confirm("Você gostaria mesmo de excluir?");
    if (!confirmDelete) return;
    const deleted = await deleteSessionById(session.id as number);
    if (!deleted) return;
    load();
  }

  return (
    <div className="sessionsContentContainer text-primary">
      <div className="sessionsContentHeader">
        <Button
          variant="outline-primary"
          className="addSession"
          onClick={() => {
            navigate("/sessions/add");
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora Inicio</th>
            <th>Hora Fim</th>
            <th>Sala</th>
            <th>Filme</th>
            <th>Valor Ingresso</th>
            <th>Tipo de Imagem</th>
            <th>Audio</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>{renderSessionList()}</tbody>
      </table>
      <div className="paginationSection">
        <div className="btn-group float-right">{renderPagination()}</div>
      </div>
    </div>
  );
}
