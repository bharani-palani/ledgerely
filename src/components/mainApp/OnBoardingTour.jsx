import React, { useCallback, useContext, useMemo } from "react";
import { Joyride } from "react-joyride";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";

const OnBoardingTour = () => {
  const userContext = useContext(UserContext);
  const { theme } = userContext.userData;
  const intl = useIntl();
  const navigate = useNavigate();
  const steps = useMemo(
    () => [
      {
        target: ".bank-tour",
        content: "bankTour",
        before: async () => {
          navigate("/bank");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".creditCard-tour",
        content: "creditCardTour",
        before: async () => {
          navigate("/creditCard");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".category-tour",
        content: "categoryTour",
        before: async () => {
          navigate("/category");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".schedules-tour",
        content: "schedulesTour",
        before: async () => {
          navigate("/schedules");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".moneyPlanner-tour",
        content: "moneyPlannerTour",
        before: async () => {
          navigate("/moneyPlanner");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".dashboard-tour",
        content: "dashboardTour",
        before: async () => {
          navigate("/dashboard");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".ledgerelyAi-tour",
        content: "aiTour",
        before: async () => {
          navigate("/ledgerelyAi");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".workbook-tour",
        content: "workbookTour",
        before: async () => {
          navigate("/workbook");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".settings-tour",
        content: "settingsTour",
        before: async () => {
          navigate("/settings");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
      {
        target: ".billing-tour",
        content: "billingTour",
        before: async () => {
          navigate("/billing");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
      },
    ],
    [navigate],
  );

  const Tooltip = useCallback(
    ({ index, step, backProps, primaryProps, skipProps, tooltipProps }) => {
      const isLastStep = index === steps.length - 1;
      return (
        <div
          {...tooltipProps}
          style={{
            backgroundColor: theme === "dark" ? "#222" : "#eeeeee",
            color: theme === "dark" ? "#FFFFFF" : "#000000",
            borderRadius: "10px",
            padding: "10px",
            width: "360px",
            boxSizing: "border-box",
          }}
        >
          <h6
            style={{
              margin: "0 0 5px",
              fontSize: "12px",
              fontWeight: 500,
              opacity: 0.7,
            }}
          >
            <i className='fa fa-forward' /> {index + 1} / {steps.length}
          </h6>

          {/* Content */}
          <div
            style={{
              fontSize: "14px",
            }}
          >
            {index === 0 && <h6 className='py-1 icon-bni'>Quick start</h6>}
            {index === 0 && (
              <div className='py-1'>Welcome to Ledgerely! Let`s take a quick look at some important features and tips to get you started.</div>
            )}
            <div className='py-3'>
              <FormattedMessage id={step.content} defaultMessage={step.content} />
            </div>
            {isLastStep && (
              <div className='py-2'>
                <i className='fa fa-thumbs-up pe-1' />
                <FormattedMessage id='tourFooter' defaultMessage='tourFooter' />
                <span className='ps-1'>😀</span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Skip */}
            <button
              {...skipProps}
              style={{
                border: "none",
                background: "transparent",
                color: "#f64444",
                cursor: "pointer",
                padding: "8px 0",
                fontSize: "12px",
              }}
            >
              <FormattedMessage id='skipTour' defaultMessage='skipTour' />
            </button>
            {/* Right buttons */}
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              {/* Back */}
              {index > 0 && (
                <button
                  {...backProps}
                  style={{
                    border: "none",
                    backgroundColor: theme === "dark" ? "#555" : "#cccccc",
                    color: theme === "dark" ? "#FFFFFF" : "#000000",
                    borderRadius: "6px",
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  <FormattedMessage id='back' defaultMessage='back' />
                </button>
              )}
              {/* Next / Last */}
              <button
                {...primaryProps}
                style={{
                  border: "none",
                  backgroundColor: theme === "dark" ? "#C4E600" : "#555",
                  color: theme === "dark" ? "#222" : "#FFFFFF",
                  borderRadius: "6px",
                  padding: "5px 12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {primaryProps.title}
              </button>
            </div>
          </div>
        </div>
      );
    },
    [intl, steps.length, theme],
  );

  /**
   * Joyride events
   */
  const handleJoyrideEvent = data => {
    const { type, action, index } = data;
    // Last step completed
    if (type === "step:after" && action === "next" && index === steps.length - 1) {
      console.log("Onboarding completed");

      // Example:
      // localStorage.setItem(
      //   "ledgerely_onboarding_completed",
      //   "true"
      // );
    }

    // User skipped the tour
    if (action === "skip") {
      console.log("Onboarding skipped");

      // Example:
      // localStorage.setItem(
      //   "ledgerely_onboarding_skipped",
      //   "true"
      // );
    }
  };

  return (
    <Joyride
      steps={steps}
      run={true}
      continuous
      tooltipComponent={Tooltip}
      onEvent={handleJoyrideEvent}
      locale={{
        next: intl.formatMessage({ id: "next", defaultMessage: "next" }),
        last: intl.formatMessage({ id: "letsGo", defaultMessage: "letsGo" }),
      }}
      skipScroll={true}
      options={{
        skipScroll: true,
        buttons: ["back", "primary", "skip"],
        arrowBase: 20,
        arrowSize: 12,
        arrowColor: theme === "dark" ? "#222" : "#eee",
        primaryColor: theme === "dark" ? "#C4E600" : "#555",
        backgroundColor: theme === "dark" ? "#222" : "#eeeeee",
        textColor: theme === "dark" ? "#FFFFFF" : "#000000",
        overlayColor: "rgba(0, 0, 0, 0.70)",
      }}
    />
  );
};

export default OnBoardingTour;
