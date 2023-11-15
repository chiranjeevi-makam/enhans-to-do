import './index.css'

import {Component} from 'react'

import TodoItem from '../TodoItem'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    completedStatus: false,
    modification: true,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    completedStatus: false,
    modification: false,
  },

  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    completedStatus: false,
    modification: false,
  },

  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    completedStatus: false,
    modification: false,
  },

  {
    id: 5,
    title: 'Order fruits on Big Basket',
    completedStatus: false,
    modification: false,
  },

  {
    id: 6,
    title: 'Fix the production issue',
    completedStatus: false,
    modification: false,
  },

  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    completedStatus: false,
    modification: false,
  },

  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    completedStatus: false,
    modification: false,
  },
]

class SimpleTodos extends Component {
  state = {data: initialTodosList, add: '', id: ''}

  collect = event => {
    this.setState({add: event.target.value})
  }

  add = () => {
    const {add, data} = this.state

    if (add.trim() === '') {
      return
    }

    const newTodo = {
      id: data.length + 1,
      title: add,
      completedStatus: false,
      modification: false,
    }

    this.setState(prevState => ({
      ...prevState,
      data: [...prevState.data, newTodo],
      add: '',
    }))
  }

  deleteTodo = id => {
    const {data} = this.state
    const updatedData = data.filter(todo => todo.id !== id)
    this.setState({data: updatedData})
  }

  editTodo = id => {
    const {data} = this.state
    const updatedData = data.map(todo =>
      todo.id === id ? {...todo, modification: true} : todo,
    )

    this.setState({data: updatedData})
  }

  saveTodo = (id, updatedTitle) => {
    const {data} = this.state
    const updatedData = data.map(todo =>
      todo.id === id
        ? {...todo, title: updatedTitle, modification: false}
        : todo,
    )

    this.setState({data: updatedData})
  }

  toggleComplete = id => {
    this.setState(prevState => {
      const updatedData = prevState.data.map(todo =>
        todo.id === id
          ? {...todo, completedStatus: !todo.completedStatus}
          : todo,
      )

      return {data: updatedData}
    })
  }

  render() {
    const {data, add} = this.state

    return (
      <>
        <div className="add">
          <input
            type="text"
            placeholder="Enter your todo"
            value={add}
            onChange={this.collect}
          />
          <button type="button" className="addButton" onClick={this.add}>
            Add
          </button>
        </div>
        <div className="backgroundContainer">
          <div className="listContainer">
            <h1 className="manHeading">Simple Todos</h1>
            <ul className="listItems">
              {data.map(each => (
                <TodoItem
                  object={each}
                  key={each.id}
                  Edit={this.editTodo}
                  Save={this.saveTodo}
                  Delete={this.deleteTodo}
                  toggle={this.toggleComplete}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default SimpleTodos
