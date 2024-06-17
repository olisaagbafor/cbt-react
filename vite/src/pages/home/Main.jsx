import React from "react";

import vector1 from "../../assets/images/vector1.png";
import vector2 from "../../assets/images/vector2.png";
import vector3 from "../../assets/images/vector3.png";
import vector4 from "../../assets/images/vector4.png";

import frame1 from "../../assets/images/frame1.png";
import frame2 from "../../assets/images/frame2.png";
import frame3 from "../../assets/images/frame3.png";
import frame4 from "../../assets/images/frame4.png";

const Main = () => {
	return (
		<main>
			<section className="section_about margin-bottom-5">
				<div className="content about_content">
					<div className="text margin-bottom-2">
						<h3>Why examcentre cbt?</h3>
					</div>
					<div className="heading-primary--2 margin-bottom-2">
						<h1>The ideal choice for simplifying and optimizing your examination processes</h1>
					</div>
					<div className="heading-secondary--2">
						<p>
							Refine your assessment process with our flexible and convenient testing solution designed specifically for your
							institution.
						</p>
					</div>
				</div>

				<div className="about_card">
					<div className="cards cbt-container flex u-align-center u-justify-content-sb margin-bottom-8">
						<div className="card">
							<div className="card-content">
								<div className="text-main capitalise margin-left-1 margin-bottom-2">
									<h3>user-friendly interface</h3>
								</div>
								<div className="heading-secondary--2 margin-left-1 margin-bottom-4">
									<p className="def-line-height">
										We have built an intuitive and easy-to-navigate interface for a seamless testing experience for both students
										and teachers
									</p>
								</div>
								<div className="card-image margin-top card_image--1">
									<img src={vector1} alt="" />
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-content">
								<div className="text-main capitalise margin-left-1 margin-bottom-2">
									<h3>Customer Support</h3>
								</div>
								<div className="heading-secondary--2 margin-left-1 margin-bottom-4">
									<p className="def-line-height">
										We prioritize your success and satisfaction, which is why our dedicated customer support team is available
										round the clock to provide prompt assistance.
									</p>
								</div>
								<div className="card-image margin-right">
									<img src={vector2} alt="" />
								</div>
							</div>
						</div>
					</div>
					<div className="cards cbt-container flex u-align-center u-justify-content-sb">
						<div className="card">
							<div className="card-content">
								<div className="text-main capitalise margin-left-1 margin-bottom-2">
									<h3>Cost Effective</h3>
								</div>
								<div className="heading-secondary--2 margin-left-1 margin-bottom-4">
									<p className="def-line-height">
										Reduce expenses associated with traditional paper-based testing, such as printing and logistics.
									</p>
								</div>
								<div className="card-image margin-top-2 card_image--3">
									<img src={vector3} alt="" />
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-content">
								<div className="text-main capitalise margin-left-1 margin-bottom-2">
									<h3>Tailored Solution</h3>
								</div>
								<div className="heading-secondary--2 margin-left-1 margin-bottom-4">
									<p className="def-line-height">
										Our platform is suitable for Schools, professional certification bodies, recruitment agencies, and educational
										bodies in general.
									</p>
								</div>
								<div className="card-image margin-top-3 card_image--4">
									<img src={vector4} alt="" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section_features">
				<div className="content features_content">
					<div className="text margin-bottom-2">
						<h3 className="color-peach">Our features</h3>
					</div>
					<div className="heading-primary--2 margin-bottom-2">
						<h1>Put Your School Ahead of the Competition</h1>
					</div>
				</div>

				<div className="features cbt-container flex u-justify-content-sb ">
					<div className="feature">
						<div className="icon margin-bottom-2">
							<img src={frame1} alt="" />
						</div>
						<div className="text-main-2 capitalise margin-bottom-2">
							<h3>Secure Testing Environment</h3>
						</div>
						<div className="heading-secondary--2 ">
							<p className="def-line-height">
								Experience a safe and reliable testing environment that ensures the integrity of assessments and advanced security
								measures provided by Amazon Web Services.
							</p>
						</div>
					</div>
					<div className="feature">
						<div className="icon margin-bottom-2">
							<img src={frame2} alt="" />
						</div>
						<div className="text-main-2 capitalise margin-bottom-2">
							<h3>Efficient Evaluation</h3>
						</div>
						<div className="heading-secondary--2 ">
							<p className="def-line-height">
								Streamline the evaluation process with our platform's automatic grading feature, providing instant test results. Say
								goodbye to manual grading and save valuable time and energy.
							</p>
						</div>
					</div>
					<div className="feature">
						<div className="icon margin-bottom-2">
							<img src={frame3} alt="" />
						</div>
						<div className="text-main-2 capitalise margin-bottom-2">
							<h3>Customisable</h3>
						</div>
						<div className="heading-secondary--2 ">
							<p className="def-line-height">
								Tailor features and functionalities to suit your school's unique structure. Edit and refine assessment details to
								perfectly align with your school's curriculum and specific educational requirements.
							</p>
						</div>
					</div>
					<div className="feature">
						<div className="icon margin-bottom-2">
							<img src={frame4} alt="" />
						</div>
						<div className="text-main-2 capitalise margin-bottom-2">
							<h3>Content Pool</h3>
						</div>
						<div className="heading-secondary--2 ">
							<p className="def-line-height">
								Save time and effort when creating tests by leveraging a vast library of ready-to-use questions and resources,
								contributed by teachers over time, eliminating the need to start from scratch.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="section-faq">
				<div className="cbt-container ">
					<div className="faq_content">
						<div className="text margin-bottom-1">
							<h3>FREQUENTLY ASKED QUESTIONS</h3>
						</div>
						<div className="heading-primary--2 margin-bottom-1">
							<h1>Everything You Need To Know</h1>
						</div>
						<div className="heading-secondary--2">
							<p className="def-line-height">
								Here are a few of the questions we get the most. If you don’t see what’s on your mind, reach out to us anytime on
								phone or email.
							</p>
						</div>
					</div>

					<div className="faq">
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								How does your CBT platform prevent exam malpractice?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">
									Our platform employs a question shuffling feature, which randomizes the order of questions for each student,
									reducing the likelihood of cheating. This eliminates the need for physical supervision during exams.
								</p>
							</div>
						</details>
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								Can I control the number of tabs students can use and how often they can switch while writing?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">
									Yes, our platform allows you to set restrictions on the number of tabs students can have open and how frequently
									they can switch between them. This ensures a focused and controlled testing environment.
								</p>
							</div>
						</details>
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								Can I upload files such as images during the exam?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">
									Absolutely! Our platform supports file uploads, including images, to enhance the assessment experience and enable
									students to provide visual responses when necessary.
								</p>
							</div>
						</details>
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								Can I upload mathematical equations, graphs, and other complex content?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">
									Yes, our platform has built-in support for mathematical equations, graphs, and other complex content. You can
									easily upload and display these types of content for students to interact with during the exam.
								</p>
							</div>
						</details>
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								What is the pricing for your CBT platform?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">The price for our CBT platform is N2500 per student per term.</p>
							</div>
						</details>
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								Is the CBT platform compatible with different devices and operating systems?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">
									Yes, our CBT platform is designed to be compatible with various devices, including desktop computers, laptops,
									tablets, and mobile phones. It is also compatible with popular operating systems such as Windows, macOS, iOS, and
									Android.
								</p>
							</div>
						</details>
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								How secure is the data stored on your CBT platform?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">
									We take data security seriously. Our platform utilizes industry-standard encryption protocols to protect the
									integrity and confidentiality of your data. Additionally, our platform is hosted on Amazon Web Services, which
									provides robust security measures and data protection infrastructure.
								</p>
							</div>
						</details>
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								How long does it take to set up and deploy the CBT platform for my institution?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">
									The setup and deployment time for our CBT platform may vary depending on the size and complexity of your
									institution’s requirements. However, our team is dedicated to ensuring a smooth implementation process, and we
									work closely with you to meet your specific timelines and needs.
								</p>
							</div>
						</details>
						<details>
							<summary className="flex flex-row u-align-center u-justify-content-sb">
								What level of technical support is provided during exams or in case of any issues?
								<i className="ri-arrow-right-s-line"></i>
							</summary>
							<div className="heading-secondary--2 margin-bottom-2">
								<p className="def-line-height">
									We provide comprehensive technical support to assist you during exams and address any issues that may arise. Our
									dedicated support team is available 24/7 to promptly respond to your queries and provide assistance to both
									administrators and users.
								</p>
							</div>
						</details>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Main;
