import './index.css'

const TodoItem = props => {
  const {object, Edit, Delete, Save, toggle} = props
  const {id, title, completedStatus, modification} = object

  let update = null

  const changeTitle = event => {
    update = event.target.value
  }
  const handleDelete = () => {
    Delete(id)
  }

  const handleToggle = () => {
    toggle(id)
  }

  const handleEdit = () => {
    Edit(id)
  }
  const handleSave = () => {
    Save(id, update)
  }
  return (
    <li>
      <div className="compledView">
        <input type="checkbox" onClick={handleToggle} />
        <p
          className={`${modification ? 'saveHidden' : 'saveShow'} ${
            completedStatus ? 'para' : ''
          }`}
          key={title}
        >
          {title}
        </p>
        <input
          value={title}
          className={modification ? 'ValueElement' : 'ValueElementHidden'}
          onChange={changeTitle}
        />
        <div className="buttons">
          <button
            type="button"
            onClick={handleEdit}
            className={modification ? 'saveHidden' : 'saveShow'}
          >
            Edit
          </button>
          <button
            type="button"
            onChange={handleSave}
            className={modification ? 'saveShow' : 'saveHidden'}
          >
            Save
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoItem
