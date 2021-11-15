import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <button>
        <Link to={"/edit/" + props.exercise._id}>Edit</Link>
      </button>{" "}
      |{" "}
      <button
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then((res) => this.setState({ exercises: res.data }))
      .catch(() => toast.error("Error"));
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => toast.success(res.data));

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }
  exerciseList() {
    return this.state.exercises.map((currentExercise) => (
      <Exercise
        exercise={currentExercise}
        deleteExercise={this.deleteExercise}
        key={currentExercise._id}
      />
    ));
  }
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}