import React, { useEffect, useState } from 'react';
import './style.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import logo from './../assets/tractian.png';
import { Card, Tabs, Progress, Row, Col, Layout, Carousel} from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const { Header, Content, Footer } = Layout;
const {TabPane} = Tabs;


const Main = () => {


    function callback(key) {
        console.log(key);
    }

    const [units, setUnits] = useState([])

    useEffect(() => {
        async function getUnits() {
            await axios.get('https://tractian-data.s3.us-east-2.amazonaws.com/api.json')
                .then(res => setUnits(res.data))     
                .catch(erro => console.log(erro))
        };

        getUnits()

    }, [])

    
      const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Ativos'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Quantidade',
            colorByPoint: true,
            data: [{
                name: 'Em uso',
                y: 6,
            }, {
                name: 'Em alerta',
                y: 1
            }, {
                name: 'Disponíveis',
                y: 1
            }, {
                name: 'Em manutenção',
                y: 10
            }]
        }]
      };

      console.log(units);

    return (


        <Layout>
            
            <Header>
            <div className="page-top">
                <img src = {logo} width="130" height="70" alt = "tractian"></img>
            </div>
            </Header>
            
            <Content style={{ padding: '0px 50px'}}>
                
                <Tabs defaultActiveKey="1" onChange={callback}>
                    
                    <TabPane tab="Home" key="1">
                        <h1 className="title">Home</h1>

                    </TabPane>
                    

                    {units.units && units.units.map(unit =>(
                        <TabPane className="tabPane" tab={unit.name} key={unit.name}>
                            <h1 className="title">{unit.name}</h1>
                                <p>
                                    <HighchartsReact highcharts={Highcharts} options={options}/>
                                </p>
                            <Row>
                                {unit.data.assetsData.map(peca=>(
                                    <Card title={peca.name} style={{ width: 500, margin: 10 }}>
                                        <Col className= "col" span={18}> 
                                            <p>
                                                <img className="imgPeca" src = {peca.model.image} alt = {peca.model.name}></img>
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
                                                Healthscore
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