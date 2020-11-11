import React from 'react'

interface IProps {
    count: number
}

const OverallApplicants = ({count}: IProps) => {
    return (
        <div className="volunteers-count">
            <span>{count}</span>
            <span>Volunteers</span>
        </div>
    )
}
export default OverallApplicants