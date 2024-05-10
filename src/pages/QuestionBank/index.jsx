import React, { useState, useRef, useEffect } from "react";

import {
  Dropdown,
  NavBar,
  Radio,
  Space,
  List,
  Tag,
  ErrorBlock,
} from "antd-mobile";
import {
  LikeOutline,
  EyeOutline,
  LinkOutline,
  ClockCircleOutline,
} from "antd-mobile-icons";

import "./index.less";
import { useNavigate } from "react-router-dom";
import { getCategoryList } from "../../api/category";
import { getBankPage } from "../../api/bank";
import { dateFtt } from "../../utils/date";
export default function QuestionBank() {
  const navigate = useNavigate();
  // 下拉菜单
  const dropRef = useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  const [bankList, setBankList] = useState([]);
  // state
  const [{ sortList, sortTitle, categoryTitle }, setState] = useState({
    // 排序
    sortList: [
      { id: "0", title: "默认排序" },
      { id: "1", title: "难度排序" },
      { id: "2", title: "题量排序" },
    ],
    // 下拉菜单-显示名称
    categoryTitle: "全部题库",
    sortTitle: "默认排序",
  });
  useEffect(() => {
    getCategoryList({ type: "2" }).then((resp) => {
      resp.data.unshift({ id: "", name: "全部题库" });
      setCategoryList(resp.data);
    });
    getBankList();
  }, []);

  const getBankList = (data) => {
    getBankPage(data).then((resp) => {
      setBankList(resp.data.list);
    });
  };

  // 分类变更
  function handleCategoryChange(val) {
    console.log(val);
    setState((pre) => ({
      ...pre,
      categoryTitle: categoryList.find((item) => item.id === val)?.name,
    }));
    getBankList({ categoryId: val });
    dropRef.current?.close();
  }

  // 排序方式变更
  function handleSortChange(val) {
    setState((pre) => ({ ...pre, sortTitle: sortList[val].title }));
    dropRef.current?.close();
  }

  // 跳转题库详情页
  function handleBankDetail(id) {
    navigate(`detail?id=${id}`);
  }

  // 题库分类
  const categoryItems = (
    <Radio.Group defaultValue="">
      <Space direction="vertical" block>
        {categoryList.map((item) => (
          <Radio
            block
            value={item.id}
            key={item.id}
            onChange={() => {
              handleCategoryChange(item.id);
            }}
          >
            {item.name}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );

  // 排序方式
  const sortItems = (
    <Radio.Group defaultValue="0">
      <Space direction="vertical" block>
        {sortList.map((item) => (
          <Radio
            block
            value={item.id}
            key={item.id}
            onChange={() => {
              handleSortChange(item.id);
            }}
          >
            {item.title}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );

  // 题库集合列表
  const bankItems =
    bankList.length > 0 ? (
      bankList.map((item) => (
        <List.Item
          description={
            <>
              <EyeOutline /> {item.views}
              <LinkOutline /> 1231
              {/* <LikeOutline /> {item.like} */}
              <ClockCircleOutline />{" "}
              {dateFtt("yyyy-MM-dd HH:mm:ss", new Date(item.updateTime))}
            </>
          }
          clickable
          key={item.id}
          onClick={() => handleBankDetail(item.id)}
        >
          {item.name}
          <Tag
            color={
              item.difficulty === "0"
                ? "success"
                : item.difficulty === "1"
                ? "primary"
                : "danger"
            }
          >
            {item.difficulty === "0"
              ? "简单"
              : item.difficulty === "1"
              ? "一般"
              : "困难"}
          </Tag>
        </List.Item>
      ))
    ) : (
      <ErrorBlock status="empty" />
    );

  return (
    <div className="question-bank">
      <NavBar backArrow={false}>题库</NavBar>
      {/* 下拉菜单-筛选/排序 */}
      <Dropdown ref={dropRef} className="drop">
        <Dropdown.Item key="category" title={categoryTitle}>
          <div style={{ padding: 10 }}>{categoryItems}</div>
        </Dropdown.Item>
        <Dropdown.Item key="sort" title={sortTitle}>
          <div style={{ padding: 12 }}>{sortItems}</div>
        </Dropdown.Item>
      </Dropdown>

      {/* 题库列表 */}
      <div className="bank-list">
        <List className="bank-item">{bankItems}</List>
      </div>
    </div>
  );
}
