import styled from "styled-components";

const ModalBackground = styled.div`
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
	border-radius: 10px;
	background-color: white;
	margin: 10% auto;
	padding: 20px;
	width: 50%;
`;

type ModalProps = {
	shouldShow: boolean;
	onRequestClose: any;
	children: any;
};

export const Modal = ({ shouldShow, onRequestClose, children }: ModalProps) => {
	return shouldShow ? (
		<ModalBackground onClick={onRequestClose}>
			<ModalBody onClick={(e: any) => e.stopPropagation()}>
				{/* <button onClick={onRequestClose}>Hide Modal</button> */}
				{children}
			</ModalBody>
		</ModalBackground>
	) : null;
};
