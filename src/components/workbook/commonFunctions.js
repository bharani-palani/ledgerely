import React, { useContext, useState, useEffect, useCallback } from "react";
import WorkbookContext from "./WorkbookContext";
import _debounce from "lodash/debounce";

const useCommonFunctions = () => {
  const workbookContext = useContext(WorkbookContext);
  const { sheets, setSheets, activeSheet, activeChart, setFile } = workbookContext;

  const callBack = useCallback(
    _debounce(params => {
      fn(params);
    }, 300),
    [activeSheet, activeChart],
  );

  const fn = params => {
    const newSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = sheet.charts.map(chart => {
          if (chart.id === activeChart) {
            chart.props = { ...chart.props, [params.id]: params.value };
          }
          return chart;
        });
      }
      return sheet;
    });
    setSheets(newSheet);
    setFile(prev => ({ ...prev, isSaved: false }));
  };

  const renderCursorFocus = ref => {
    if (ref.current) {
      const range = document.createRange();
      const selection = window.getSelection();

      range.selectNodeContents(ref.current);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
      ref.current.focus();
    }
  };

  return { callBack, renderCursorFocus };
};

export { useCommonFunctions };
