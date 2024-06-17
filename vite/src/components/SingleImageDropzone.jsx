import React from "react";
import { useDropzone } from "react-dropzone";

function SingleImageDropzone({ setFieldValue, image, fieldName, details, text }) {
	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		// noDrag: true,
		accept: "image/*",
		onDrop: (acceptedFiles) => {
			setFieldValue(
				fieldName,
				Object.assign(acceptedFiles[0], {
					preview: URL.createObjectURL(acceptedFiles[0]),
				})
			);
		},
	});

	return (
		<div className="my-container">
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<div className="add-student-upload-container">
					<div className="add-student-upload">
						<aside className="thumbs-container">
							<img
								src={
									image
										? image.preview
											? image.preview
											: image
										: details
										? "https://banner2.cleanpng.com/20180814/jjv/kisspng-vector-graphics-graphic-design-design-education--5b735fa60b29c4.9162809915342877820457.jpg"
										: "https://aecsp.qc.ca/wp-content/uploads/2021/03/person_icon-icons.com_50075.png"
								}
								className="thumbs-image"
								alt=""
							/>
							{text ? (
								<div className="thumbs-info">Change {text}</div>
							) : (
								<div className="thumbs-info">Change {details ? "Logo" : "Image"}</div>
							)}
						</aside>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleImageDropzone;
