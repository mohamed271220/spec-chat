const GenderCheckbox = ({ onCheckboxChange, selectGender }) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label htmlFor="" className={`label gap-2 cursor-pointer ${selectGender === 'male' ? 'selected' : ''}`}>
                    <span className="label-text">Male</span>
                    <input
                        checked={selectGender === 'male'}
                        onChange={() => onCheckboxChange('male')}
                        type="checkbox" name="" id="" className="checkbox border-slate-900" />
                </label>
            </div>
            <div className='form-control'>
                <label htmlFor="" className={`label gap-2 cursor-pointer  ${selectGender === 'male' ? 'selected' : ''}`}>
                    <span className="label-text">Female</span>
                    <input
                        checked={selectGender === 'female'}
                        onChange={() => onCheckboxChange('female')}
                        type="checkbox" name="" id="" className="checkbox border-slate-900" />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox