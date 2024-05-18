/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import "./Home.css";

import cbtLogoWhite from "../../assets/images/cbtLogoWhite.png";

import heroImg from "../../assets/images/heroImg.png";
import { Link } from "react-router-dom";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openMobileMenu = () => {
		setIsOpen((menu) => !menu);
	};

	return (
		<header className="home-header">
			<div className="clip-bg"></div>
			<div className="menu_bar web">
				<div className="cbt-container flex u-justify-content-sb u-align-center ">
					<div className="logo-box">
						<img src={cbtLogoWhite} alt="Logo" className="logo" />
					</div>
					<div className="cta header_cta flex u-align-center">
						<div className="button--1">
							<button>
								<Link to="/login">Log in</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="menu_bar mobile display-none">
				<div className="cbt-container flex flex-row u-justify-content-sb u-align-center ">
					<div className="logo-box">
						<img src={cbtLogoWhite} alt="Logo" className="logo" />
					</div>

					<a href="#" className="icon menu-btn" onClick={openMobileMenu}>
						<i className="ri-menu-5-line"></i>
					</a>
				</div>
				<div className={`cbt-container mobile-nav ${isOpen ? "open" : "close"}`}>
					<div className="cta header_cta">
						<div className="button--1 margin-bottom-2">
							<button>
								<Link to="/login">Log in</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="cbt-container">
				<section className="section_hero">
					<div className="heading-primary">
						<h1>Computer-Based Tests Anywhere, Anytime</h1>
					</div>
					<div className="heading-secondary">
						<p>
							Empowering Institutions and Organizations with the most proficient, user-friendly Computer-Based Testing Software for
							seamless and reliable assessments
						</p>
					</div>
					<div className="cta hero-cta">
						<div className="button--2 btn">
							<button>
								<a href="https://examcentre.ng/contact">
									<span>Contact Us to Get Started</span>
									<i className="ri-arrow-right-line"></i>
								</a>
							</button>
						</div>
					</div>
					<div className="hero-image">
						<img src={heroImg} alt="" />
					</div>
				</section>
			</div>
		</header>
	);
};

export default Header;
