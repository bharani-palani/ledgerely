import React, { useContext } from "react";
import { Joyride } from "react-joyride";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Abc = () => <p>Step 1 — Overview Your financial snapshot Get a quick view of your income, expenses, balance and overall financial health.</p>;

const OnBoardingTour = () => {
  const userContext = useContext(UserContext);
  const { theme } = userContext.userData;
  const navigate = useNavigate();
  const steps = [
    {
      target: ".dashboard-tour",
      content: <Abc />,
      before: async () => {
        navigate("/dashboard");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".bank-tour",
      content: "This is bank!",
      before: async () => {
        navigate("/bank");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".creditCard-tour",
      content: "This is credit card!",
      before: async () => {
        navigate("/creditCard");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".category-tour",
      content: "This is category!",
      before: async () => {
        navigate("/category");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".schedules-tour",
      content: "This is schedules!",
      before: async () => {
        navigate("/schedules");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".moneyPlanner-tour",
      content: "This is my money planner!",
      before: async () => {
        navigate("/moneyPlanner");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".ledgerelyAi-tour",
      content: "This is my Ledgerely AI!",
      before: async () => {
        navigate("/ledgerelyAi");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".workbook-tour",
      content: "This is my workbook!",
      before: async () => {
        navigate("/workbook");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".billing-tour",
      content: "This is my billing!",
      before: async () => {
        navigate("/billing");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
    {
      target: ".settings-tour",
      content: "This is my settings!",
      before: async () => {
        navigate("/settings");
        await new Promise(resolve => setTimeout(resolve, 300));
      },
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={true}
      continuous
      showProgress
      options={{
        buttons: ["back", "primary", "skip"],
        skipScroll: true,
        arrowBase: 20,
        arrowSize: 12,
        arrowColor: theme === "dark" ? "#292D32" : "#fff",
        primaryColor: theme === "dark" ? "#C4E600" : "#555",
        backgroundColor: theme === "dark" ? "#222" : "#eeeeee",
        textColor: theme === "dark" ? "#FFFFFF" : "#000000",
        overlayColor: "rgba(0, 0, 0, 0.70)",
      }}
      locale={{
        back: "Back",
        next: "Next",
        last: "Let's Get Started",
        skip: "Skip Tour",
      }}
      styles={{
        buttonPrimary: {
          padding: "8px 12px",
        },
        buttonBack: {
          backgroundColor: theme === "dark" ? "#555" : "#cccccc",
          padding: "8px 12px",
        },
        buttonSkip: {
          color: "#f64444",
        },
      }}
      onEvent={d => {
        console.log(d);
      }}
    />
  );
};

export default OnBoardingTour;
