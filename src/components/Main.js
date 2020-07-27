import React, { useEffect, useState } from 'react';
import './style.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import alertimage from './../assets/alert.jpg';
import logo from './../assets/tractian.png';
import checkimage from './../assets/check.jpg';
import { Card, Tabs, Progress, Row, Col, Layout, Badge, Statistic, Divider} from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import Graph from './Graph/graph';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const {TabPane} = Tabs;

const Main=()=>{

  const [units, setUnits] = useState([]);

  useEffect(()=>{
    async function getUnits() {
      await axios.get('https://tractian-data.s3.us-east-2.amazonaws.com/api.json')
        .then(res => {
            setUnits(res.data)
            if(res.data){
              const {inUse, available, onAlert, underMaintenance} = res.data.units.data.map(unit => unit);
            }
        })     
        .catch(erro => console.log(erro))
    };

    getUnits()

  }, [])

  return(
    <Layout> 

      <Header>
        <div className="page-top">
          <img src = {logo} width="130" height="70" alt = "tractian"></img>
        </div>
      </Header>
        <Content style={{ padding: '0px 50px'}}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Home" key="1">
              {units.units && units.units.map(unit =>(
              <Row justify="space-around">
                <Divider orientation="left">{unit.name}</Divider>
                <Card 
                  headStyle={{ color: '#1E90FF' }}
                  title="Insights"
                  hoverable 
                  style={{ width: 400, margin: 12 }} 
                  cover={<img alt={alertimage} 
                  src={alertimage}/>}
                >
                <Badge count={unit.data.insightsPending} /> Insights pendentes
                  <img  style={{ width: 350, margin: 12 }} src={checkimage}></img>
                <Badge className="site-badge-count-109" count={unit.data.insightsChecked} style={{ backgroundColor: '#52c41a' }} /> Insights resolvidos
                </Card>
                <Graph
                  inUse = {unit.data.inUse}
                  available = {unit.data.available}
                  onAlert = {unit.data.onAlert}
                  underMaintenance = {unit.data.underMaintenance}
                />  
                <Card
                  headStyle={{ color: '#1E90FF' }}
                  title="Total de ativos"
                  hoverable 
                  style={{ width: 200, height: 200, margin: 12 }} 
                >
                  <Statistic value={unit.data.countAssets}/>
                </Card> 
              </Row>
              ))}
            </TabPane>
            {units.units && units.units.map(unit=>(
            <TabPane className="title-card" tab={unit.name} key={unit.name}>
              <h1 className="title">{unit.name}</h1>
                <Row>
                  <Col span={12} offset={6}>
                    <Graph 
                      inUse = {unit.data.inUse}
                      available = {unit.data.available}
                      onAlert = {unit.data.onAlert}
                      underMaintenance = {unit.data.underMaintenance}
                      insightsPending = {unit.data.insightsPending}
                      insightsChecked = {unit.data.insightsChecked}
                    />
                  </Col>
                </Row>
              <Row justify="space-around">
                {unit.data.assetsData.map(peca=>(
                  <Card title={peca.name} style={{ width: 500, margin: 12}} headStyle={{color: '#1E90FF', border: '#1E90FF' }}>
                    <Col> 
                      <p>
                        <img className="imgPeca" src={peca.model.image} alt={peca.model.name}></img>
                      </p>  
                      <p className="title-card">
                        Descrição:
                        <p className = "text-card">
                          {peca.description} 
                        </p> 
                      </p>  
                      <p className="title-card">
                        Insights:
                        <p className = "text-card">
                            <CheckCircleTwoTone twoToneColor="#52c41a" className="icon-card"/>
                          Resolvidos: {peca.insights.checked}
                          <br></br>
                            <ClockCircleTwoTone twoToneColor="#ffd700" className="icon-card"/>  
                          Pendentes: {peca.insights.pending} 
                        </p>
                      </p>
                      <p className="title-card">
                        Saúde do ativo:
                        <p className = "text-card">
                            <Progress percent={peca.healthscore.health}  />
                        </p> 
                      </p>
                    </Col>
                  </Card>
                ))}
              </Row>
            </TabPane>
            ))}
          </Tabs>
        </Content> 
        <Footer style={{ textAlign: 'center' }}>by Carolina Ribeiro Da Col Silva</Footer>            
    
    </Layout>
  );
}


export default Main;