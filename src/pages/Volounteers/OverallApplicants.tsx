import React from 'react'

interface Props {
    count: number
}

const OverallApplicants = ({ count }: Props) => {
    return (
        <div className="volounteers-count">
            <span>{count}</span>
            <span>Volounteers</span>
        </div>
    )
}
export default OverallApplicants