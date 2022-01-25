interface RecordPerPageSelectorProps {
    onChange(numberOfRecordsPerPage: number): void;
}

export default function RecordPerPageSelector(props: RecordPerPageSelectorProps) {

    return (
        <div className="mb-3" style={{width: '150px'}}>
            <label>Record per page</label>
            <select 
            className="form-select"
            defaultValue={5}
            onChange={e => props.onChange(parseInt(e.currentTarget.value, 10))}    
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
            </select>

        </div>
    );
}