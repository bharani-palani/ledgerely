import React, { useCallback, useContext, useMemo } from "react";
import { Joyride } from "react-joyride";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";

const OnBoardingTour = () => {
  const onboardingCompleted = localStorage.getItem("ledgerely_onboarding_completed") === "true";
  const onboardingSkipped = localStorage.getItem("ledgerely_onboarding_skipped") === "true";
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
          className={`rounded-3 p-2 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}
          style={{
            width: "360px",
          }}
        >
          <div className='small pb-1'>
            <i className='fa fa-play pe-1' /> {index + 1} / {steps.length}
          </div>
          {/* Content */}
          <h6 className='fs-5 text-primary'>
            <FormattedMessage id='tourTitle' defaultMessage='tourTitle' />
          </h6>
          <div className='small pb-1'>
            {index === 0 && (
              <div className='pb-2'>
                <FormattedMessage id='tourSubTitle' defaultMessage='tourSubTitle' />
              </div>
            )}
            <div className='pb-1'>
              <FormattedMessage id={step.content} defaultMessage={step.content} />
            </div>
            {isLastStep && (
              <div className='pb-2'>
                <i className='fa fa-thumbs-up pe-1 text-warning' />
                <FormattedMessage id='tourFooter' defaultMessage='tourFooter' />
                <span className='ps-1'>😀</span>
              </div>
            )}
          </div>
          {isLastStep && (
            <div className='pb-1 small text-danger'>
              <sup>*</sup>
              <FormattedMessage id='sampleDataTour' defaultMessage='sampleDataTour' />
            </div>
          )}
          {/* Buttons */}
          <div className='d-flex align-items-center justify-content-between py-2'>
            {/* Skip */}
            <button {...skipProps} className='btn btn-sm btn-danger' title={intl.formatMessage({ id: "skipTour", defaultMessage: "skipTour" })}>
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
                <button {...backProps} className='btn btn-sm btn-success px-3' title={intl.formatMessage({ id: "back", defaultMessage: "back" })}>
                  <i className='fa fa-step-backward' />
                </button>
              )}
              {/* Next / Last */}
              <button {...primaryProps} className='btn btn-sm btn-success px-3' title={intl.formatMessage({ id: "next", defaultMessage: "next" })}>
                {isLastStep ? primaryProps.title : <i className='fa fa-step-forward' />}
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
      localStorage.setItem("ledgerely_onboarding_completed", "true");
    }

    // User skipped the tour
    if (action === "skip") {
      localStorage.setItem("ledgerely_onboarding_skipped", "true");
    }
  };

  return (
    !onboardingCompleted &&
    !onboardingSkipped && (
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
    )
  );
};

export default OnBoardingTour;
