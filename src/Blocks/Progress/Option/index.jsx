import React from "react";
import "./style.css";

const Option = ({ check, title, date }) => {
  return (
    <div className="progress-option-container ">
      <div className="hero-sale-process-option-icon">
        {check && (
          <svg
            width="19"
            height="15"
            viewBox="0 0 19 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4026 1.39657C17.0188 1.01301 16.4984 0.797546 15.9558 0.797546C15.4132 0.797546 14.8927 1.01301 14.5089 1.39657L6.54791 9.35657L3.65322 6.46188C3.26936 6.07802 2.74874 5.86237 2.20588 5.86237C1.66302 5.86237 1.1424 6.07802 0.758537 6.46188C0.374678 6.84574 0.159027 7.36637 0.159027 7.90923C0.159027 8.45209 0.374678 8.97271 0.758537 9.35657L5.10082 13.6983C5.48459 14.0816 6.00478 14.2969 6.54714 14.2969C7.0895 14.2969 7.60969 14.0816 7.99346 13.6983L17.4046 4.29074C17.7879 3.90697 18.0032 3.38678 18.0032 2.84442C18.0032 2.30206 17.7879 1.78187 17.4046 1.3981L17.4026 1.39657Z"
              fill="url(#paint0_linear_43_394)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_43_394"
                x1="0.159027"
                y1="7.54722"
                x2="18.0032"
                y2="7.54722"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DA4A52" />
                <stop offset="1" stopColor="#DF775A" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
      <div className="progress-option--title">{title}</div>
      <div className="progress-option--date">{date}</div>
    </div>
  );
};

export default Option;
