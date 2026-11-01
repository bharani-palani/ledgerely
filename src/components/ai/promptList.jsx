import moment from "moment";

const previousMonth = moment().subtract(1, "month");
const previousMonthLabel = previousMonth.format("MMMM YYYY");

const promptList = [
  {
    id: "totIncExpForMonth",
    prompt: `Show my total income and total expenses for ${previousMonthLabel}.`,
    icon: ["fa fa-th-large"],
  },
  {
    id: "top10IncExp",
    prompt: `Show my 10 largest bank transactions for ${previousMonthLabel}, with the description, amount, type, date, category, and bank.`,
    icon: ["fa fa-table"],
  },
  {
    id: "top10CredTrx",
    prompt: `Show my 10 largest credit card purchases for ${previousMonthLabel}, with the description, date, purchase amount, card, category, and status.`,
    icon: ["fa fa-table"],
  },
  {
    id: "goodPlans",
    prompt: `Show my good plan transactions for ${previousMonthLabel}.`,
    icon: ["fa fa-table"],
  },
  {
    id: "achievedPlans",
    prompt: `Show my achieved plan transactions for ${previousMonthLabel}.`,
    icon: ["fa fa-table"],
  },
  {
    id: "badPlans",
    prompt: `Show my bad plan transactions for ${previousMonthLabel}.`,
    icon: ["fa fa-table"],
  },
  {
    id: "noPlans",
    prompt: `Show my transactions without a plan for ${previousMonthLabel}.`,
    icon: ["fa fa-table"],
  },
  {
    id: "insertCred",
    prompt: "Add a credit card purchase for Vegetables, category {groceries}, card {my credit card}, amount 500.",
    icon: ["fa fa-plus-square"],
  },
  {
    id: "insertBank",
    prompt: "Record an expense for Petrol, category {fuel}, bank {my first bank}, amount 500.",
    icon: ["fa fa-plus-square"],
  },
  {
    id: "credStatement",
    prompt: `Show the statement for credit card {credit card} for ${previousMonthLabel}, in date order.`,
    icon: ["fa fa-table"],
  },
  {
    id: "joinBankIncExp",
    prompt: `Compare my income and expenses by category for ${previousMonthLabel}.`,
    icon: ["fa fa-table"],
  },
  {
    id: "joinCredTrx",
    prompt: `Show credit card spending by card and category for ${previousMonthLabel}.`,
    icon: ["fa fa-table"],
  },
  {
    id: "joinCredChart",
    prompt: `Chart my credit card spending by category for ${previousMonthLabel}, from highest to lowest.`,
    icon: ["fa fa-table", "fa fa-pie-chart"],
    tooltip: "{label, value, text, name}",
  },
  {
    id: "joinIncExpChart",
    prompt: `Chart my expenses by category for ${previousMonthLabel}, from highest to lowest.`,
    icon: ["fa fa-table", "fa fa-pie-chart"],
    tooltip: "{label, value, text, name}",
  },
  {
    id: "expenseStats",
    prompt: `For ${previousMonthLabel}, show total, average, highest, lowest, and number of expenses by category.`,
    icon: ["fa fa-table"],
  },
  {
    id: "distinctExpenseCategories",
    prompt: `List each category with expenses in ${previousMonthLabel} once, with its transaction count.`,
    icon: ["fa fa-table"],
  },
];

export default promptList;
