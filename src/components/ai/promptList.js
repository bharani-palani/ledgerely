const promptList = [
  {
    id: 1,
    prompt: "Get my total bank accounts",
  },
  {
    id: 3,
    prompt: "Get bank accounts",
  },
  {
    id: 2,
    prompt: "Total income and expense for this month",
  },
  {
    id: 4,
    prompt: "Get recent top 10 income expense transactions for this month",
  },
  {
    id: 5,
    prompt: "Get recent top 10 credit card transactions for this month",
  },
  {
    id: 6,
    prompt: "What is the maximum transaction amount in income expense for this month?",
  },
  {
    id: 7,
    prompt: "What is the maximum transaction amount in credit card transactions for this month?",
  },
  {
    id: 8,
    prompt: "Insert into credit card for transaction vegetables, for category groceries, card my credit card, amount 500",
  },
  {
    id: 9,
    prompt:
      "Join bank table, income expense table, category table and show all sum of expenses and income incurred for this month, where total amount > 0, group by category and type",
  },
  {
    id: 10,
    prompt:
      "Join credit cards table, credit card transactions table, category table and show all relevant fields where sum of purchase amount > 0 for this month group by category and card",
  },
];

export default promptList;
