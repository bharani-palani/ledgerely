const promptList = [
  {
    id: 2,
    prompt: "Total income and expense for this month",
    icon: ["fa fa-th-large"],
  },
  {
    id: 4,
    prompt: "Get top 10 income expense transactions for this month",
    icon: ["fa fa-table"],
  },
  {
    id: 5,
    prompt: "Get top 10 credit card transactions for this month",
    icon: ["fa fa-table"],
  },
  {
    id: 6,
    prompt: "Maximum transaction amount in income expense transactions for this month?",
    icon: ["fa fa-table"],
  },
  {
    id: 7,
    prompt: "Maximum purchase amount in credit card transactions for this month?",
    icon: ["fa fa-table"],
  },
  {
    id: 8,
    prompt: "Insert into credit card for transaction vegetables, for category groceries, for card my credit card, amount 500",
    icon: ["fa fa-plus-square"],
  },
  {
    id: 8.1,
    prompt: "Insert into income expense for transaction petrol, for category fuel, for bank my first bank, amount 500",
    icon: ["fa fa-plus-square"],
  },
  {
    id: 9,
    prompt:
      "Join bank table, income expense table, category table and show all sum of expenses and income incurred for this month, where total amount > 0, group by category and type",
    icon: ["fa fa-table"],
  },
  {
    id: 10,
    prompt:
      "Join credit cards table, credit card transactions table, category table and show all relevant fields where sum of purchase amount > 0 for this month group by category and card",
    icon: ["fa fa-table"],
  },
  {
    id: 11,
    prompt:
      "Join credit card transactions table, category table, where sum of credits amount > 0 for this month group by category and order by amount descending with chart having category as label and amount as value",
    icon: ["fa fa-table", "fa fa-pie-chart"],
  },
  {
    id: 12,
    prompt:
      "Join income transactions table, category table, where sum of expense amount > 0 for this month group by category and order by amount descending with chart having category as label and amount as value",
    icon: ["fa fa-table", "fa fa-pie-chart"],
  },
];

export default promptList;
