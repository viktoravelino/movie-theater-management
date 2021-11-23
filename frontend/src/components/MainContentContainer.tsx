type MainContentContainerProps = {
	ContentElement: any;
	title: string;
};

export function MainContentContainer({
	ContentElement,
	title,
}: MainContentContainerProps) {
	return (
		<div className="col px-0 pb-4">
			<div className="shadow" style={{ backgroundColor: "#ffffff" }}>
				<div className="py-4 ps-4">
					<span className="fs-4 fw-bold text-primary">{title}</span>
				</div>
			</div>
			<hr className="mt-0" style={{ opacity: "0" }} />
			<div className="px-3" style={{ backgroundColor: "#fff" }}>
				<ContentElement />
			</div>
		</div>
	);
}
