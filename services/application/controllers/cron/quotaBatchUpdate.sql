UPDATE apps a
LEFT JOIN (
    SELECT user_appId AS appId, COUNT(*) AS total
    FROM users
    GROUP BY user_appId
) users ON users.appId = a.appId
LEFT JOIN (
    SELECT bank_appId AS appId, COUNT(*) AS total
    FROM banks
    GROUP BY bank_appId
) banks ON banks.appId = a.appId
LEFT JOIN (
    SELECT credit_card_appId AS appId, COUNT(*) AS total
    FROM credit_cards
    GROUP BY credit_card_appId
) creditCards ON creditCards.appId = a.appId
LEFT JOIN (
    SELECT inc_exp_cat_appId AS appId, COUNT(*) AS total
    FROM income_expense_category
    GROUP BY inc_exp_cat_appId
) categories ON categories.appId = a.appId
LEFT JOIN (
    SELECT inc_exp_appId AS appId, COUNT(*) AS total
    FROM income_expense
    GROUP BY inc_exp_appId
) ie ON ie.appId = a.appId
LEFT JOIN (
    SELECT cc_appId AS appId, COUNT(*) AS total
    FROM credit_card_transactions
    GROUP BY cc_appId
) creditCardTrx ON creditCardTrx.appId = a.appId
LEFT JOIN (
    SELECT dsq_appId AS appId, sum(length(dsq_object)) AS total
    FROM datasourceQuery
    GROUP BY dsq_appId
) dataSource ON dataSource.appId = a.appId
LEFT JOIN (
    SELECT wb_appId AS appId, sum(length(wb_object)) AS total
    FROM workbook
    GROUP BY wb_appId
) workbook ON workbook.appId = a.appId
LEFT JOIN (
    SELECT temp_appId AS appId, COUNT(*) AS total
    FROM income_expense_template
    GROUP BY temp_appId
) template ON template.appId = a.appId
SET
    a.usersSize = COALESCE(users.total, 0),
    a.bankAccountsSize = COALESCE(banks.total, 0),
    a.creditCardsSize = COALESCE(creditCards.total, 0),
    a.categoriesSize = COALESCE(categories.total, 0),
    a.incomeExpenseTransactionSize = COALESCE(ie.total, 0),
    a.creditCardTransactionSize = COALESCE(creditCardTrx.total, 0),
    /** 
    * todo: if cloud storage added, storage size should be updated
    */
    a.storageSize = 0,
    a.dataSourceSize = COALESCE(dataSource.total, 0),
    a.workbookSize = COALESCE(workbook.total, 0),
    a.templateSize = COALESCE(template.total, 0),
    a.quotaLastUpdated = NOW()
WHERE a.isActive = '1';