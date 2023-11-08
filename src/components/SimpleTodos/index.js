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
    const enterText = event.target.value

    const splitText = enterText.split(' ')
    const title = splitText.slice(0, -1).join(' ')
    const idEnter = splitText.slice(-1)[0]

    this.setState({add: title, id: idEnter})
  }

  add = () => {
    const {add, id, data} = this.state
    const idNum = parseInt(id, 10)

    if (Number.isNaN(idNum) || idNum <= 0) {
      return
    }

    const creatingNewItems = []

    for (let i = 0; i < idNum; i += 1) {
      const newId = data.length + i + 1
      creatingNewItems.push({
        id: newId,
        title: add,
        completedStatus: false,
        modification: false,
      })
    }

    this.setState(prevState => ({
      ...prevState,
      data: [...prevState.data, ...creatingNewItems],
    }))
  }

  deleteTodo = id => {
    const {data} = this.state
    const updatedData = data.filter(todo => todo.id !== id)
    this.setState({data: updatedData})
  }

  editTodo = id => {
    const {data} = this.state
    const updatedData = data.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          modification: true,
        }
      }
      return todo
    })

    this.setState({data: updatedData})
  }

  saveTodo = (id, updatedTitle) => {
    const {data} = this.state
    const updatedData = data.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: updatedTitle,
          modification: false,
        }
      }
      return todo
    })

    this.setState({data: updatedData})
  }

  toggleComplete = id => {
    this.setState(prevState => {
      const updatedData = prevState.data.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completedStatus: !todo.completedStatus,
          }
        }
        return todo
      })

      return {data: updatedData}
    })
  }

  render() {
    const {data, add, id} = this.state
    console.log(add)
    console.log(id)
    console.log(data.length)
    console.log(data)
    return (
      <>
        <div className="add">
          <input
            type="text"
            placeholder="Enter your todo"
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
