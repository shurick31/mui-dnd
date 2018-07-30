import React, { Component } from 'react';
import { Row, Col, Card, CardTitle} from 'react-materialize';

const MyCard = function(props) {

  return (
    <Col m={3}
      draggable={true}
      onDragStart={(e) => props.onDragStart(e,props.index )}
      key={props.index}
      id={ props.index}
      onDragOver={(e) => props.onDragOver(e)}
      droppable="true">
      <Card header={<CardTitle reveal image={"assets/office.jpg"} waves='light'/>}
          title={'Card title ' + props.index}


          reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
          <p><a href="#">This is a link</a></p>

      </Card>
    </Col>
  );
}
export default class TestMat extends Component {

  constructor() {
    super();

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOverItem = this.onDragOverItem.bind(this);
    this.state = { hoverOver: null, items:["1","2","3"]}
  }
  onDragStart(evt, id) {
    evt.dataTransfer.setData("id", id);
    this.setState({ started: id });
  }

  onDragOverItem(e) {
    e.preventDefault();
    var over = e.currentTarget.id;
    let idx = this.state.items.find((e,i) => {if(e === over){return i} });
    if(e.clientY - e.currentTarget.offsetTop > e.currentTarget.offsetHeight / 2) { idx++; }
    if(over !== this.state.hoverOver) { this.setState({ hoverOver: idx }); }
  }

  onDrop = (ev, cat) => {
    let src = ev.dataTransfer.getData("id");
    let idx = 0;

    for(let i=0;i<this.state.items.length;i++) {
      if(this.state.items[i] == src) {
        idx = i;
        break;
      }
    }

    let arr = this.state.items;
    arr.splice(idx,1);
    arr.splice(this.state.hoverOver, 0, src);
    this.setState({hoverOver:null, items: arr})
  }

  render() {
    return(
      <Row droppable="true" onDrop = { (e) => this.onDrop(e)}>
          { this.state.items.map(elem => <MyCard key={elem} index={elem} onDragStart={(e) => this.onDragStart(e,elem)} onDragOver={(e) => this.onDragOverItem(e)}/>)}
      </Row>
    );
  }
}
