import React, { Component } from "react";
import styles from './index.less'
import { history } from 'umi';
import { List, Card, Pagination, Select, Button,Breadcrumb, Spin } from 'antd';
import { Input } from 'antd';
import { deepClone, quickSort } from '@/utils/tools';
import { getdata } from '@/service/home';
import {IGame, IFavoritesState} from '@/interface'

const { Search } = Input;
const { Option } = Select;


class favorites extends Component {
  state:IFavoritesState = {
    sortType: [
      {
        title: '时间顺序',
        value: 'time'
      },
      {
        title: '时间倒序',
        value: 'time_r'
      }
    ],
    gameType:[],
    game: [],
    showGame: [],
    searchValue: '',
    // 搜索结果
    searchRes:[],
    // 当前排序类型
    currentSortType: 'time',
    // 当前游戏类型
    currentGameType: '全部',
    page: 1,
    pageSize: 10,
    total:0
  }
  shouldComponentUpdate(nextProps: object, nextState: IFavoritesState): boolean {
    let isTypeChange = this.state.currentGameType !== nextState.currentGameType
    let isSearchChange = this.state.searchValue !== nextState.searchValue
    let isSortTypeChange = this.state.currentSortType !== nextState.currentSortType
    let isShowGameChange = this.state.showGame !== nextState.showGame
    // 搜索条件改变
    if (isTypeChange || isSearchChange || isSortTypeChange) {
      this.handerGameList(nextState)
      return true
    }
    // 展示游戏改变
    if (isShowGameChange) {
      // let list:number[] = []
      // // console.log(this.state.showGame,nextState.showGame)
      // let res:any = localStorage.getItem('favoritesList')
      // list = JSON.parse(res)
      // this.updateIsFavorites(nextState.showGame,list)
      return true
    }
    return false;
  }
  componentDidMount() {
    this.getGameList()
  }
  // 获取数据,初始化
  getGameList = async () => {
    // const { global }:any = this.props
    // let { game } = global
    let data = await getdata()
    this.getGameType(data.data)
    let res:any = localStorage.getItem('favoritesList')
    let list = JSON.parse(res)
    let game = data.data.filter((item: { id: number | string }) => {
      return list.includes(item.id)
    })
    this.setState({
      game, // 总数据
      searchRes: game, // 处理后的总数据
      showGame: game.slice(0, 10), // 展示数据
      total: game.length
    })
  }
  // 获取游戏类型
  getGameType = (GameList: Array<IGame>) => {
    let obj:any = {}
    let gameType: string[] = ['全部']
    GameList.forEach(item => {
      let key = item.genre
      if (!obj[key]) {
        obj[key] = 1
        gameType.push(item.genre)
      }
    })
    this.setState({gameType})
  }
  // 数据处理
  handerGameList = (state:IFavoritesState) => {
    console.log(111)
    const { game, searchValue, currentGameType, pageSize, currentSortType } = state
    // 模糊搜索
    let All_game: Array<IGame> = deepClone(game)
    let filterGame: Array<IGame> = [];
    All_game.map((item:IGame) => {
      if (item.title.toLowerCase().indexOf(searchValue) > -1) {
        filterGame.push(item);
      }
    });
    
    // 过滤游戏类型
    if (currentGameType !== '全部') {
      filterGame = filterGame.filter(item => {
        return item.genre === currentGameType
      })
    }
    
    // 排序
    switch (currentSortType) {
      case 'time': filterGame = quickSort(filterGame).reverse(); break;
      case 'time_r': filterGame = quickSort(filterGame); break;
    }
    // 分页初始化
    this.setState({
      searchRes: filterGame,
      showGame: filterGame.slice(0, pageSize),
      page: 1,
      total: filterGame.length
    })
  }
  // 页面切换
  currentPageChange = (page:number, pageSize:number) => {
    const { searchRes } = this.state
    let start: number = (page - 1) * pageSize
    let end: number = (page * pageSize)
    let showGame:Array<IGame> = searchRes.slice(start, end)
    this.setState({
      showGame,
      pageSize,
      page
    })
  }
  // 跳转详情
  toDetail(item: IGame) {
    history.push(`/detail?id=${item.id}&from=favorites`)
  }
  // 移出收藏夹
  remove = (item: IGame,event: { stopPropagation: () => void; }) => {
    event?.stopPropagation()
    let res:any = localStorage.getItem('favoritesList')
    let list = JSON.parse(res)
    let idx = list.indexOf(item.id)
    list.splice(idx,1)
    localStorage.setItem('favoritesList', JSON.stringify(list))
    this.getGameList()
  }
  render() {
    const { total, showGame, sortType, gameType, page, pageSize } = this.state
    return (
      <>
        <header className={styles.header}>
          <div className={styles['d-j-c']}>
            当前位置:&nbsp;
            <Breadcrumb>
              <Breadcrumb.Item>
                收藏夹
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.rightBox}>
              <Search
                placeholder="输入游戏名称"
                onSearch={(searchValue)=>{this.setState({ searchValue })}}
                style={{ width: 200 }}
              />
              <div className={styles.selector}>
                <span className={styles.label}>游戏类型:</span>
                <Select defaultValue='全部' placeholder="请选择" style={{ width: 120 }} onChange={(currentGameType)=>{this.setState({ currentGameType })}}>
                  {
                    gameType.map(item => 
                      <Option value={item} key={item}>{item}</Option>
                    )
                  }
                </Select>
              </div>
              <div className={styles.selector}>
                <span className={styles.label}>排序方式:</span>
                <Select defaultValue='时间顺序' placeholder="请选择" style={{ width: 120 }} onChange={(currentSortType)=>{this.setState({currentSortType})}}>
                  {
                    sortType.map(item => 
                      <Option value={item.value} key={item.value}>{item.title}</Option>
                    )
                  }
                </Select>
              </div>
            </div>
        </header>
        <section className={styles.section}>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={showGame}
                renderItem={item => (
                  <List.Item>
                    <Card
                      hoverable
                      className={styles.card}
                      style={{ width: 'auto' }}
                      cover={<img alt={item['title']} src={item['thumbnail']} />}
                      onClick={()=>{this.toDetail(item)}}
                    >
                      {/* <Card.Meta title={item['title']} description={item['short_description']} /> */}
                      <div className={styles.title}>{item['title']}</div>
                      <p className={styles.short_description}>简介: {item['short_description']}</p>
                      <div className={styles.release_date}>发行日期: {item['release_date']}</div>
                      <div className={`${styles.ButtonRow}`}>
                        {/* <Button type="primary" style={{marginRight: 10}} onClick={()=>{this.toDetail(item)}}>
                          查看详情
                        </Button> */}
                        <Button type="primary" danger onClick={(e)=>{this.remove(item,e)}} >
                          移出收藏夹
                        </Button>
                      </div>
                    </Card>
                  </List.Item>
                )}
            />
        </section>
        <footer className={styles.footer}>
          <Pagination
            pageSize={pageSize}
            onChange={this.currentPageChange}
            showSizeChanger
            onShowSizeChange={this.currentPageChange}
            current={page}
            total={total} />
        </footer>
      </>
    )
  }
}

export default favorites