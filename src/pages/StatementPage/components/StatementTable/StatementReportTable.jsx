import styles from './StatementReportTable.module.scss'
function StatementReportTable({ data }) {
  return (
    <div>
      <table className={styles.table__wrapper}>
        <thead className={styles.table__head}>
          <tr className={styles.table__row}>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Заявитель</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Адресат</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Тип</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Название</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Статус</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Дата подачи</span>
            </th>
          </tr>
        </thead>

        <tbody className={styles.table__body}>
          {data?.map((item, index) => {
            return (
              <tr key={index} className={styles.table__row}>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item.employee}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {item?.employee?.first_name} {item.addressee}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item.type_doc}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item.type}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item.status}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {item.date_zayavki}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StatementReportTable
