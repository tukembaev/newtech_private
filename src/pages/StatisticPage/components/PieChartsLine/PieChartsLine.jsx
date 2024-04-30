import React from 'react'
import styles from './PieChartsLine.module.scss'
import { PieChart } from 'react-minimal-pie-chart'

const PieChartsLine = ({ data }) => {
  const dataProjects = [
    { title: 'Завершенные', value: data?.project_percent, color: '#18AF55' },
    {
      title: 'В процессе выполнения',
      value: 100 - data?.project_percent,
      color: '#FFB03A',
    },
  ]
  const dataTask = [
    { title: 'Завершенные', value: data?.tasks_percent, color: '#18AF55' },
    {
      title: 'В процессе выполнения',
      value: 100 - data?.tasks_percent,
      color: '#FFB03A',
    },
  ]
  const dataObr = [
    {
      title: 'Завершенные',
      value: data?.conversions_percent,
      color: '#18AF55',
    },
    {
      title: 'В процессе выполнения',
      value: 100 - data?.conversions_percent,
      color: '#FFB03A',
    },
  ]

  return (
    <div className={styles.pie_chats_col}>
      <div className={styles.pie_chats_line}>
        <div className={styles.single_pie}>
          <div className={styles.single_pie}>
            <div className={styles.pie_size}>
              <PieChart
                animate
                animationDuration={1000}
                animationEasing="ease-in"
                center={[50, 50]}
                data={dataProjects}
                lineWidth={20}
                paddingAngle={dataProjects[0].value > 0 ? 18 : 0}
                rounded
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={(index) => ({
                  fill: dataProjects[index].color,
                  fontSize: '12px',
                  fontColor: 'FFFFFA',
                  fontWeight: '800',
                })}
                labelPosition={60}
                style={{
                  width: '123px',
                  heigth: '123px',
                  marginLeft: '12px',
                  marginTop: '10px',
                }}
                
              />
            </div>
          </div>
          <h5>Проекты</h5>
          <h5>
            {data?.project} ({data?.project_percent}%){' '}
          </h5>
        </div>
        
        <div className={styles.single_pie}>
          <div className={styles.single_pie}>
            <div className={styles.pie_size}>
              <PieChart
                animate
                animationDuration={1000}
                animationEasing="ease-in"
                center={[50, 50]}
                data={dataTask}
                lineWidth={20}
                paddingAngle={dataTask[0].value > 0 ? 18 : 0}
                rounded
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={(index) => ({
                  fill: dataTask[index].color,
                  fontSize: '12px',
                  fontColor: 'FFFFFA',
                  fontWeight: '800',
                })}
                labelPosition={60}
                style={{
                  width: '123px',
                  heigth: '123px',
                  marginLeft: '12px',
                  marginTop: '10px',
                }}
              />
            </div>
          </div>
          <h5>Задачи</h5>
          <h5>
            {data?.tasks} ({data?.tasks_percent}%)
          </h5>
        </div>
        
        <div className={styles.single_pie}>
          <div className={styles.single_pie}>
            <div className={styles.pie_size}>
              <PieChart
                  animate
                  animationDuration={1000}
                  animationEasing="ease-in"
                  center={[50, 50]}
                  data={dataObr}
                  lineWidth={20}
                  paddingAngle={dataObr[0].value > 0 ? 18 : 0}
                  rounded
                  label={({ dataEntry }) => dataEntry.value}
                  labelStyle={(index) => ({
                    fill: dataObr[index].color,
                    fontSize: '12px',
                    fontColor: 'FFFFFA',
                    fontWeight: '800',
                  })}
                  labelPosition={60}
                  style={{
                    width: '123px',
                    heigth: '123px',
                    marginLeft: '12px',
                    marginTop: '10px',
                  }}
              />
            </div>
          </div>
          <h5>Обращения</h5>
          <h5>
            {data?.conversions} ({data?.conversions_percent}%)
          </h5>
        </div>
      </div>
    </div>
  )
}

export default PieChartsLine
