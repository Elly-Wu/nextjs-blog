import React, { useState } from 'react'

export default function Calendar() {
  const [thisYear, setThisYear] = useState(new Date().getFullYear()) // 定義當前年份的 state，默認值為當前年份
  const [thisMonth, setThisMonth] = useState(new Date().getMonth()) // 定義當前月份的 state，默認值為當前月份（從 0 開始，0 代表 1 月
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  // 計算當月份有多少天，使用 Date 物件來確定月份的天數
  const getDaysInMonth = (year, month) => {
    // month + 1 表示下個月， day=0 表示上個月的最後一天
    return new Date(year, month + 1, 0).getDate()
  }
  // 獲取當月第一天是星期幾，返回值 0-6 代表星期日到星期六
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }
  // 取得今天的日期，用於比對生成日曆時標記當天
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()
  const todayDate = today.getDate()
  // 生成日曆格子，包括日期格子和前置的空白格子
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(thisYear, thisMonth) // 獲取當前月份的總天數
    const firstDay = getFirstDayOfMonth(thisYear, thisMonth) // 獲取當前月份第一天是星期幾，準備填補空格
    const daysArray = [] // 用來存放每一天的 JSX 元素
    let dayCount = 1 // 計數器，用於標示當前是第幾天

    // 生成空的前置天數
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="empty-day" />)
    }

    // 生成日曆中的天數，並且標記今天
    for (let i = 0; i < daysInMonth; i++) {
      // 檢查當前生成的日期是否是今天
      const isToday = thisYear === todayYear && thisMonth === todayMonth && dayCount === todayDate

      // 將當前日期生成 JSX 元素，若是今天則附加 `today` class
      daysArray.push(
        <div key={`day-${i}`} className={`day ${isToday ? 'today' : ''}`}>
          {dayCount++}{/* 每日日期遞增 */}
        </div>
      )
    }

    return daysArray // 返回完整的日期 JSX 陣列
  }
  // 處理月份變更及月份溢出的情況（如跨年），offset 為 -1 或 1，用來調整上一月或下一月
  const handleMonthChange = (offset) => {
    let newMonth = thisMonth + offset // 新的月份
    let newYear = thisYear // 新的年份

    // 處理月份邊界情況，如果超過 12 月或低於 1 月，自動調整年份
    if (newMonth < 0) {
      newMonth = 11
      newYear--
    } else if (newMonth > 11) {
      newMonth = 0
      newYear++
    }

    // 更新當前月份和年份的 state
    setThisMonth(newMonth)
    setThisYear(newYear)
  }

  const weekdays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]
  return (
    <>
      <div className="calendar-container">
        {/* 顯示當前月份和年份，並包含上一月與下一月按鈕 */}
        <div className="calendar-header">
          <button onClick={() => handleMonthChange(-1)}>Prev</button>
          <h2>
            {months[thisMonth]} {thisYear}
          </h2>
          <button onClick={() => handleMonthChange(1)}>Next</button>
        </div>
        {/* 顯示星期的標題 */}
        <div className="calendar-grid">
        {weekdays.map((v, i) => {
              return <div key={i}>{v}</div>
            })}
        </div>
        {/* 生成當前月份的日曆 */}
        <div className="calendar-grid">{generateCalendar()}</div>
      </div>

      <style jsx>{`
        .calendar-container {
          width: 99%;
          margin: 0 auto;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          {/* margin-bottom: 10px; */}
        }

        button {
          background-color: #e9e6e4;
          border: 1px dashed #ad9676;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr); // 7 列，對應星期日到星期六
          grid-gap: 8px;
        }

        .day,
        .empty-day {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ddd;
        }

        .empty-day {
          background-color: #f4f4f4;
        }
        {/* .today樣式在 global.css */}

        @media screen and (max-width: 560px) {
          .calendar-container {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
