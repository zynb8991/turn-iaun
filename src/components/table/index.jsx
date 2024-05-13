
const Table = ({columns, rows}) => {
  return (
    <div className="form-container border border-slate-300 overflow-y-auto max-h-[500px]">
        <table className="table border-separate border-spacing-3">
            <thead>
                <tr>
                    {
                        columns.map((col) => col)
                    }
                </tr>
            </thead>
            {
                rows.map((row, index) => 
                    <tbody key={index}>
                        <tr key={index}>
                            {row.map((col, index2) => col != '' && <td key={index2}>{col}</td>)}
                        </tr>
                    </tbody>)
            }
        </table>
    </div>
  )
}

export default Table