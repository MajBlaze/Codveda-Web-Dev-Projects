const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="card filter-grid">
      <input
        type="text"
        placeholder="Enter title or subject"
        value={filters.search}
        onChange={(event) => onFilterChange("search", event.target.value)}
      />

      <select value={filters.status} onChange={(event) => onFilterChange("status", event.target.value)}>
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.priority}
        onChange={(event) => onFilterChange("priority", event.target.value)}
      >
        <option value="all">All Priority</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    </div>
  );
};

export default FilterBar;
