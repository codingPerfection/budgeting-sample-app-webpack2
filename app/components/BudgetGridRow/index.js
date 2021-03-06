// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { History } from 'react-router-dom';
import formatAmount from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import { getFlowShareForTransactionFormatted } from 'selectors/transactions';
import styles from './style.scss';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
  share: String,
  history: History,
};

export const BudgetGridRow = ({ transaction, categories, share, history }: BudgetGridRowProps) => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];

  const onClick = () => {
    history.push(`/budget/item-details/${id}`);
  };

  return (
    <tr key={id} onClick={onClick}>
      <td>
        <div className={styles.cellLabel}>Category</div>
        <div className={styles.cellContent}>{category}</div>
      </td>
      <td>
        <div className={styles.cellLabel}>Description</div>
        <div className={styles.cellContent}>{description}</div>
      </td>
      <td>
        <div className={styles.cellLabel}>Contribution</div>
        <div className={styles.cellContent}>{share}</div>
      </td>
      <td className={amountCls}>
        <div className={styles.cellLabel}>Amount</div>
        <div className={styles.cellContent}>{amount.text}</div>
      </td>
    </tr>
  );
};

const mapStateToProps = (state, ownProps) => ({
  share: getFlowShareForTransactionFormatted(state, ownProps),
});

export default withRouter(connect(mapStateToProps)(BudgetGridRow));
