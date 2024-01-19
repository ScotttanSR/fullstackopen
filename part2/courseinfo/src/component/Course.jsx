const Header = (props) => {
return (
    <>
    <h1>{props.coursesName}</h1>
    </>
)
}

const Part = (props) => {
const content = props.parts.map((part) => {
    return (
    <p key={part.id}>{part.name} {part.exercises}</p>
    )
})
return (
    <>
    {content}
    </>
)
}

const Content = (props) => {
return (
    <div>
    <Part parts={props.courses.parts} />
    <Total courses={props.courses} />
</div>
)
}

const Total = (props) => {
const exerciseArr = props.courses.parts.map((part) => part.exercises)
const total = exerciseArr.reduce((accumulator, currentValue) => 
    accumulator + currentValue,
    0,)
return (
    <>
    <b>total of {total} exercises</b>
    </>
)
}

const Course = (props) => {
return (
    <>
    <Header coursesName={props.courses[0].name} />
    <Content courses={props.courses[0]} />
    <Header coursesName={props.courses[1].name} />
    <Content courses={props.courses[1]} />
    </>
)
}

export default Course