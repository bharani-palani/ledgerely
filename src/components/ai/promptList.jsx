import moment from "moment";

const promptList = [
  {
    id: "totIncExpForMonth",
    prompt: "Total income and expense for this month",
    icon: ["fa fa-th-large"],
  },
  {
    id: "top10IncExp",
    prompt: "Get top 10 income expense transactions for this month",
    icon: ["fa fa-table"],
  },
  {
    id: "top10CredTrx",
    prompt: "Get top 10 credit card transactions for this month",
    icon: ["fa fa-table"],
  },
  {
    id: "goodPlans",
    prompt: "Show good plans for this month",
    icon: ["fa fa-table"],
  },
  {
    id: "achievedPlans",
    prompt: "Show achieved plans for this month",
    icon: ["fa fa-table"],
  },

  {
    id: "badPlans",
    prompt: "Show bad plans for this month",
    icon: ["fa fa-table"],
  },
  {
    id: "noPlans",
    prompt: "Show no plans for this month",
    icon: ["fa fa-table"],
  },
  {
    id: "insertCred",
    prompt: "Insert into credit card for transaction vegetables, for category {groceries}, for card {my credit card}, for amount 500",
    icon: ["fa fa-plus-square"],
  },
  {
    id: "insertBank",
    prompt: "Insert into income expense for transaction petrol, for category {fuel}, for bank {my first bank}, for amount 500",
    icon: ["fa fa-plus-square"],
  },
  {
    id: "credStatement",
    prompt: `Get statement for credit card {credit card} for month ${moment().format("MMM YYYY")} order by date`,
    icon: ["fa fa-table"],
  },
  {
    id: "joinBankIncExp",
    prompt:
      "Join bank table, income expense table, category table and show all sum of expenses and income incurred for this month, where total amount > 0, group by category and type",
    icon: ["fa fa-table"],
  },
  {
    id: "joinCredTrx",
    prompt:
      "Join credit cards table, credit card transactions table, category table and show all relevant fields where sum of purchase amount > 0 for this month group by category and card",
    icon: ["fa fa-table"],
  },
  {
    id: "joinCredChart",
    prompt:
      "Join credit card transactions table, category table, where sum of credits amount > 0 for this month group by category and order by amount descending with chart having category as label and amount as value",
    icon: ["fa fa-table", "fa fa-pie-chart"],
  },
  {
    id: "joinIncExpChart",
    prompt:
      "Join income transactions table, category table, where sum of expense amount > 0 for this month group by category and order by amount descending with chart having category as label and amount as value",
    icon: ["fa fa-table", "fa fa-pie-chart"],
  },
];

export default promptList;
