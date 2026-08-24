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
        topic: "bank",
      },
      {
        target: ".creditCard-tour",
        content: "creditCardTour",
        before: async () => {
          navigate("/creditCard");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "creditCard",
      },
      {
        target: ".category-tour",
        content: "categoryTour",
        before: async () => {
          navigate("/category");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "category",
      },
      {
        target: ".schedules-tour",
        content: "schedulesTour",
        before: async () => {
          navigate("/schedules");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "schedules",
      },
      {
        target: ".moneyPlanner-tour",
        content: "moneyPlannerTour",
        before: async () => {
          navigate("/moneyPlanner");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "moneyPlanner",
      },
      {
        target: ".dashboard-tour",
        content: "dashboardTour",
        before: async () => {
          navigate("/dashboard");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "dashboard",
      },
      {
        target: ".ledgerelyAi-tour",
        content: "aiTour",
        before: async () => {
          navigate("/ledgerelyAi");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "ledgerelyAi",
      },
      {
        target: ".workbook-tour",
        content: "workbookTour",
        before: async () => {
          navigate("/workbook");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "workbook",
      },
      {
        target: ".settings-tour",
        content: "settingsTour",
        before: async () => {
          navigate("/settings");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "settings",
      },
      {
        target: ".billing-tour",
        content: "billingTour",
        before: async () => {
          navigate("/billing");
          await new Promise(resolve => setTimeout(resolve, 300));
        },
        topic: "billing",
      },
    ],
    [navigate],
  );

  const Beacon = ({ onClick }) => {
    return (
      <div
        onClick={onClick}
        aria-label='Start Ledgerely Quick Start'
        className='btn btn-primary btn-sm rounded-3'
        style={{
          position: "relative",
          animation: "ledgerely-pulse 3s infinite",
          top: "50%",
        }}
      >
        <div className='d-flex gap-2'>
          <span>
            <FormattedMessage id='welcome' defaultMessage='welcome' />
          </span>
          <span>🎉</span>
          <span>
            <FormattedMessage id='tourTitle' defaultMessage='tourTitle' />
          </span>
        </div>
        <style>
          {`
          @keyframes ledgerely-pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(13, 10, 253, 0.9);
            }
            50% {
              box-shadow: 0 0 0 30px rgba(13, 10, 253, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(13, 10, 253, 0);
            }
          }
        `}
        </style>
      </div>
    );
  };

  const Tooltip = useCallback(
    ({ index, step, backProps, primaryProps, skipProps, tooltipProps }) => {
      const isLastStep = index === steps.length - 1;
      return (
        <div
          {...tooltipProps}
          className={`rounded-3 p-2 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}
          style={{
            width: "400px",
          }}
        >
          {/* Content */}
          <h6 className='fs-5 text-primary'>
            <FormattedMessage id='tourTitle' defaultMessage='tourTitle' />
            <span className='ps-1'>
              - {index + 1}/{steps.length}
            </span>
          </h6>
          <div className='small pb-1'>
            {index === 0 && (
              <div className='pb-2'>
                <FormattedMessage id='tourSubTitle' defaultMessage='tourSubTitle' />
              </div>
            )}
            <div className='py-2'>
              <span className={`py-2 fs-6`}>
                <FormattedMessage id={step.topic} defaultMessage={step.topic} />
              </span>
            </div>
            <div className='pb-1'>
              <FormattedMessage id={step.content} defaultMessage={step.content} />
            </div>
          </div>
          {isLastStep && (
            <div className='pb-1 small text-danger'>
              <sup>*</sup>
              <FormattedMessage id='sampleDataTour' defaultMessage='sampleDataTour' />
            </div>
          )}
          {isLastStep && (
            <div className='py-2'>
              <i className='fa fa-thumbs-up pe-1 text-warning' />
              <FormattedMessage id='tourFooter' defaultMessage='tourFooter' />
              <span className='ps-1'>😀</span>
            </div>
          )}

          {/* Buttons */}
          <div className='d-flex align-items-center justify-content-between py-2'>
            {/* Skip */}
            <button {...skipProps} className='btn btn-sm btn-danger' title={intl.formatMessage({ id: "skipTour", defaultMessage: "skipTour" })}>
              <i className='fa fa-stop-circle pe-1' />
              <FormattedMessage id='skipTour' defaultMessage='skipTour' />
            </button>
            {/* Right buttons */}
            <div className='d-flex gap-2'>
              {/* Back */}
              {index > 0 && (
                <button {...backProps} className='btn btn-sm btn-success px-3' title={intl.formatMessage({ id: "back", defaultMessage: "back" })}>
                  <i className='fa fa-backward pe-1' />
                  <FormattedMessage id='back' defaultMessage='back' />
                </button>
              )}
              {/* Next / Last */}
              <button {...primaryProps} className='btn btn-sm btn-success px-3' title={intl.formatMessage({ id: "next", defaultMessage: "next" })}>
                {isLastStep ? (
                  <span>
                    <i className='fa fa-rocket pe-1' />
                    {primaryProps.title}
                  </span>
                ) : (
                  <>
                    <FormattedMessage id='next' defaultMessage='next' />
                    <i className='fa fa-forward ps-1' />
                  </>
                )}
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
        beaconComponent={Beacon}
        onEvent={handleJoyrideEvent}
        locale={{
          next: intl.formatMessage({ id: "next", defaultMessage: "next" }),
          last: intl.formatMessage({ id: "letsGo", defaultMessage: "letsGo" }),
        }}
        scrollToFirstStep={false}
        disableScrolling
        options={{
          skipScroll: true,
          buttons: ["back", "primary", "skip"],
          arrowBase: 15,
          arrowSize: 15,
          arrowColor: theme === "dark" ? "#222" : "#eeeeee",
          backgroundColor: theme === "dark" ? "#222" : "#eeeeee",
          textColor: theme === "dark" ? "#FFFFFF" : "#000000",
          overlayColor: `rgba(0, 0, 0, ${theme === "dark" ? 0.7 : 0.5})`,
          spotlightRadius: "30",
          overlayClickAction: false,
        }}
        styles={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          },
        }}
      />
    )
  );
};

export default OnBoardingTour;
