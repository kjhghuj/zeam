import React, { Component } from "react";
import { history  } from 'umi';
import styles from './index.less';
import { getdetail } from '@/service/detail';
import { Swiper,SwiperSlide } from 'swiper/react';
import {IDetailState} from '@/interface'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/swiper.less';
import { Button, Typography, Divider, Row, Col, Breadcrumb,Radio,Progress,Comment, Tooltip, List, Avatar, Image,Input   } from 'antd';
import { WalletOutlined, HeartOutlined, SendOutlined, FireOutlined, UserOutlined, RadarChartOutlined, ArrowUpOutlined, MessageOutlined,LikeOutlined,SmileOutlined,FrownOutlined } from '@ant-design/icons';
import moment from 'moment';
const { TextArea } = Input;
const { Title, Paragraph, Text, Link } = Typography;

class detail extends Component {
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.initGameDetail()
  }
  state:IDetailState = {
    Game:{
      id: null,
      title: '',
      thumbnail: '',
      short_description: '',
      description:'',
      game_url: '',
      genre: '',
      platform: '',
      publisher: '',
      developer: '',
      release_date: '',
      freetogame_profile_url: '',
      minimum_system_requirements:{},
      screenshots:[]
    },
    inputValue:'',
    isFromHome: true,
    inFavoritesList:false,
    data: [
      {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(1, 'days').fromNow()}</span>
          </Tooltip>
        ),
      },
      {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(2, 'days').fromNow()}</span>
          </Tooltip>
        ),
      },
    ]
  }
  initGameDetail = async () => {
    const { location } = history;
    const query: any = location.query
    let list: any = localStorage.getItem('favoritesList')
    const inFavoritesList:boolean = JSON.parse(list).includes(+query.id)
    let res = await getdetail(query)
    this.setState({
      Game:res.data,
      isFromHome: query.from === 'home',
      inFavoritesList
    })
  }
  handleSizeChange = () => {

  }
  onChange = (e: { target: { value: string; }; }) => {
    this.setState({
      inputValue:e.target.value
    })
  };
  // 发评论
  send = () => {
    const { inputValue,data } = this.state
    let res = [...data]
    console.log(inputValue)
    let content = (<p>
      {inputValue}
    </p>)
    res.unshift({
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: content,
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    })
    this.setState({
      inputValue: '',
      data: res
    })
  }
  // 加入收藏夹
  toFavorites = (id: number|null) => {
    let res = localStorage.getItem('favoritesList')
    let list:Array<number|null> = []
    if (!res) { // 无收藏队列，创建
      list.push(id)
    } else { // 有收藏队列，1,取值加入收藏队列，2更新showGame
      let res:any = localStorage.getItem('favoritesList')
      list = JSON.parse(res)
      list.push(id)
    }
    localStorage.setItem('favoritesList', JSON.stringify(list))
    this.setState({
      inFavoritesList:true
    })
  }
  render(): React.ReactNode {
    // const data = [
    //   {
    //     actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    //     author: 'Han Solo',
    //     avatar: 'https://joeschmoe.io/api/v1/random',
    //     content: (
    //       <p>
    //         We supply a series of design principles, practical patterns and high quality design
    //         resources (Sketch and Axure), to help people create their product prototypes beautifully and
    //         efficiently.
    //       </p>
    //     ),
    //     datetime: (
    //       <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
    //         <span>{moment().subtract(1, 'days').fromNow()}</span>
    //       </Tooltip>
    //     ),
    //   },
    //   {
    //     actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    //     author: 'Han Solo',
    //     avatar: 'https://joeschmoe.io/api/v1/random',
    //     content: (
    //       <p>
    //         We supply a series of design principles, practical patterns and high quality design
    //         resources (Sketch and Axure), to help people create their product prototypes beautifully and
    //         efficiently.
    //       </p>
    //     ),
    //     datetime: (
    //       <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
    //         <span>{moment().subtract(2, 'days').fromNow()}</span>
    //       </Tooltip>
    //     ),
    //   },
    // ]
    const { isFromHome, Game, inFavoritesList,data } = this.state
    return (
      <>
        <section className={styles.TopDisplayBox}>
          <div className={styles.left}>
            <img src={Game.thumbnail} alt={Game.thumbnail} />
            <div className={styles['d-j-b']}>
              <Button className={`${styles.LeftButton} ${styles.buy} ${styles['f-1']}`} style={{marginRight: '1rem'}} type="ghost" icon={<WalletOutlined />} block>
                购买
              </Button>
              {
                inFavoritesList ? (
                  <Button className={`${styles.inFavoritesList} ${styles['f-2']}`} type="primary" disabled icon={<HeartOutlined />} block>
                    已加入收藏夹
                  </Button>
                ) : (
                  <Button className={`${styles.LeftButton} ${styles['f-2']}`} type="ghost" icon={<HeartOutlined />} block onClick={()=>{this.toFavorites(Game.id)}}>
                    加入收藏夹
                  </Button>
                )
              }
            </div>
            <Typography className={styles.msr}>
              <Title level={5}>最低系统配置 (Windows)</Title>
              <Paragraph>
                  <p>
                    <span>OS: </span>
                    <span>{Game.minimum_system_requirements.os}</span>
                  </p>
                  <p>
                    <span>Processor: </span>
                    <span>{Game.minimum_system_requirements.processor}</span>
                  </p>
                  <p>
                    <span>Memory: </span>
                    <span>{Game.minimum_system_requirements.memory}</span>
                  </p>
                  <p>
                    <span>Graphics: </span>
                    <span>{Game.minimum_system_requirements.graphics}</span>
                  </p>
                  <p>
                    <span>Storage: </span>
                    <span>{Game.minimum_system_requirements.storage}</span>
                  </p>
              </Paragraph>
            </Typography>
          </div>
          <div className={styles.right}>
          <div className={styles['d-j-s']}>
            当前位置:&nbsp;
            <Breadcrumb>
              <Breadcrumb.Item>
                {isFromHome ? <a href="/">首页</a> : <a href="/favorites">收藏夹</a>}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {Game.title}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Typography>
            <Title>{Game.title}</Title>
            <Paragraph>
              <Row>
                <Col span={10} className={styles.info}>
                  <p><FireOutlined /> Very Positive</p>
                  <p><RadarChartOutlined /> 24 Member Ratings</p>
                  <p><UserOutlined /> 224 Members have this game in their library!</p>
                  <p className={styles['d-j-b']} style={{paddingRight:'4rem'}}>
                    <span><MessageOutlined /> 1 Review</span>
                    <span><ArrowUpOutlined /> 10%Popularity</span>
                  </p>
                </Col>
                <Col span={14} style={{paddingLeft: '10rem'}} className={`${styles['d-j-c']} ${styles['f-d-c']}`}>
                  <Progress type="circle" percent={75} strokeWidth={10} />
                  <Radio.Group value={1} onChange={this.handleSizeChange} style={{marginTop: '1rem'}}>
                    <Radio.Button value="large"><LikeOutlined /></Radio.Button>
                    <Radio.Button value="default"><SmileOutlined /></Radio.Button>
                    <Radio.Button value="small"><FrownOutlined /></Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </Paragraph>
            <Divider />
            <Title>游戏介绍</Title>
            <Paragraph>
              <Text strong>{Game.description}</Text>.
            </Paragraph>
            <Title>附加信息</Title>
            <Paragraph className={styles.addinfo}>
              <Row>
                <Col span={8}>
                  <div>游戏名称:</div>
                  <p>{Game.title}</p>
                </Col>
                <Col span={8}>
                  <div>开发者:</div>
                  <p>{Game.developer}</p>
                </Col>
                <Col span={8}>
                  <div>发布者:</div>
                  <p>{Game.publisher}</p>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div>版本日期:</div>
                  <p>{Game.release_date}</p>
                </Col>
                <Col span={8}>
                  <div>游戏类型:</div>
                  <p>{Game.genre}</p>
                </Col>
                <Col span={8}>
                  <div>运行平台:</div>
                  <p>{Game.platform}</p>
                </Col>
              </Row>
            </Paragraph>
            <Divider />
            <Title level={2}>游戏截图</Title>
            <Paragraph>
              <Swiper
                className={styles.swiper}
                spaceBetween={20}
                slidesPerView={3}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                
              >
                {
                  Game['screenshots'].map((item: { id: React.Key | null | undefined; image: string | undefined; }) => {
                    return (
                      <SwiperSlide key={item.id} className={styles.swiperslide}>
                        <Image
                          width={'100%'}
                          src={item.image}
                          fallback="data:image/png;base64,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"
                        />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </Paragraph>
            <Title level={2}>用户评论</Title>
            <Paragraph>
              <TextArea showCount maxLength={500} style={{ height: '12rem', marginRight: '1rem' }} onChange={this.onChange} />
              <Button type="primary" style={{width: '12rem',marginTop:'1rem'}} icon={<SendOutlined />}  onClick={this.send} block>
                send
              </Button>
              <List
                className="comment-list"
                header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item:any) => (
                  <li>
                    <Comment
                      actions={item.actions}
                      author={item.author}
                      avatar={item.avatar}
                      content={item.content}
                      datetime={item.datetime}
                    />
                  </li>
                )}
              />
            </Paragraph>
          </Typography>
          </div>
          <div></div>
        </section>
      </>
    )
  }
}
export default detail