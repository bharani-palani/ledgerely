import { useIntl } from "react-intl";

const csFunctions = [
  {
    label: "VALUE",
    mode: "propertyBindingFunction",
    pieces: ["{0},", "{1},", "{2}"],
    hasQuotes: [false, false, false],
  },
  {
    label: "SUM",
    mode: "propertyBindingFunction",
    pieces: ["SUM({0}),", "{1},", "{2}"],
    hasQuotes: [false, false, false],
  },
  {
    label: "AVG",
    mode: "propertyBindingFunction",
    pieces: ["AVG({0}),", "{1},", "{2}"],
    hasQuotes: [false, false, false],
  },
  {
    label: "MAX",
    mode: "propertyBindingFunction",
    pieces: ["MAX({0}),", "{1},", "{2}"],
    hasQuotes: [false, false, false],
  },
  {
    label: "MIN",
    mode: "propertyBindingFunction",
    pieces: ["MIN({0}),", "{1},", "{2}"],
    hasQuotes: [false, false, false],
  },
  {
    label: "CONTAINS",
    mode: "propertyBindingFunction",
    pieces: ["{0},", "LIKE,", "%{2}%"],
    hasQuotes: [false, false, false],
  },
];

const functions = [
  { label: "NULL", mode: "function" },
  { label: "SUM", mode: "function" },
  {
    label: "SUMIF",
    mode: "propertyBindingFunction",
    pieces: ["SUM(IF({0}", "{1}", "{2},", "{3},0))"],
    hasQuotes: [false, false, true, false],
  },
  { label: "COUNT", mode: "function" },
  {
    label: "COUNTIF",
    mode: "propertyBindingFunction",
    pieces: ["COUNT(IF({0}", "{1}", "{2},", "{3},0))"],
    hasQuotes: [false, false, true, false],
  },
  { label: "MIN", mode: "function" },
  {
    label: "MINIF",
    mode: "propertyBindingFunction",
    pieces: ["MIN(IF({0}", "{1}", "{2},", "{3},0))"],
    hasQuotes: [false, false, true, false],
  },
  { label: "MAX", mode: "function" },
  {
    label: "MAXIF",
    mode: "propertyBindingFunction",
    pieces: ["MAX(IF({0}", "{1}", "{2},", "{3},0))"],
    hasQuotes: [false, false, true, false],
  },
  { label: "AVG", mode: "function" },
  {
    label: "AVGIF",
    mode: "propertyBindingFunction",
    pieces: ["AVG(IF({0}", "{1}", "{2},", "{3},0))"],
    hasQuotes: [false, false, true, false],
  },
  { label: "DISTINCT", mode: "function" },
];

const useDataSourceConstants = () => {
  const intl = useIntl();

  const operators = [
    {
      label: "EQUALTO",
      mode: "operator",
      value: "= '{a}'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "NOTEQUALTO",
      mode: "operator",
      value: "!= '{a}'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "LESSTHAN",
      mode: "operator",
      value: "< '{a}'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "number",
        defaultMessage: "number",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "GREATERTHAN",
      mode: "operator",
      value: "> '{a}'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "number",
        defaultMessage: "number",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "LESSTHANEQUALTO",
      mode: "operator",
      value: "<= '{a}'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "number",
        defaultMessage: "number",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "GREATERTHANEQUALTO",
      mode: "operator",
      value: ">= '{a}'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "number",
        defaultMessage: "number",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "CONTAINS",
      mode: "operator",
      value: "LIKE '%{a}%'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "STARTSWITH",
      mode: "operator",
      value: "LIKE '{a}%'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "ENDSWITH",
      mode: "operator",
      value: "LIKE '%{a}'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "DOESNOTCONTAIN",
      mode: "operator",
      value: "NOT LIKE '%{a}%'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "DOESNOTBEGINWITH",
      mode: "operator",
      value: "NOT LIKE '{a}%'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "DOESNOTENDWITH",
      mode: "operator",
      value: "NOT LIKE '%{a}'",
      valueType: "SINGLE",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "ISNULL",
      mode: "operator",
      value: "IS NULL",
      valueType: "NULL",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "ISNOTNULL",
      mode: "operator",
      value: "IS NOT NULL",
      valueType: "NULL",
      placeholder: intl.formatMessage({
        id: "stringNumber",
        defaultMessage: "stringNumber",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "IN",
      mode: "operator",
      value: "IN {n}",
      valueType: "MULTIPLE",
      placeholder: intl.formatMessage({
        id: "commaSeparatedValues",
        defaultMessage: "commaSeparatedValues",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "NOTIN",
      mode: "operator",
      value: "NOT IN {n}",
      valueType: "MULTIPLE",
      placeholder: intl.formatMessage({
        id: "commaSeparatedValues",
        defaultMessage: "commaSeparatedValues",
      }),
      suffix: "AND",
      input: "",
    },
    {
      label: "BETWEEN",
      mode: "operator",
      value: "BETWEEN '{a}' AND '{b}'",
      valueType: "DOUBLE",
      placeholder: intl.formatMessage({
        id: "commaSeparatedValues",
        defaultMessage: "commaSeparatedValues",
      }),
      suffix: "AND",
      input: "",
    },
  ];

  const joinTypes = [
    {
      label: "INNER",
      mode: "joinQuery",
    },
    {
      label: "OUTER",
      mode: "joinQuery",
    },
    {
      label: "LEFT",
      mode: "joinQuery",
    },
    {
      label: "RIGHT",
      mode: "joinQuery",
    },
    {
      label: "LEFT OUTER",
      mode: "joinQuery",
    },
    {
      label: "RIGHT OUTER",
      mode: "joinQuery",
    },
  ];

  const orderTypes = [
    {
      label: "DESC",
      mode: "operator",
      value: "DESC",
      valueType: "NULL",
    },
    {
      label: "ASC",
      mode: "operator",
      value: "ASC",
      valueType: "NULL",
    },
  ];

  const limitTypes = [
    {
      label: "Count",
      input: 1000,
      min: 0,
      max: 1000,
    },
    {
      label: "Offset",
      input: 0,
      min: 0,
      max: 1000,
    },
  ];

  return {
    functions,
    csFunctions,
    operators,
    joinTypes,
    orderTypes,
    limitTypes,
  };
};

export default useDataSourceConstants;
