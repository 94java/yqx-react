import React, { useEffect, useState } from "react";
import { CapsuleTabs } from "antd-mobile";
import NoteCard from "../../../components/NoteCard";

import "./index.less";
import { getCategoryList } from "../../../api/category";
import { getNotePage } from "../../../api/note";
export default function Note() {
  // 分类信息
  const [categoryList, setCategoryList] = useState([{ id: 1 }]);
  // 笔记信息
  const [noteList, setNoteList] = useState([{ id: 1 }]);
  const [activeCategory, setActiveCategory] = useState("1");

  // 钩子函数
  useEffect(() => {
    getCategoryList({ type: "0" }).then((resp) => {
      setCategoryList(resp.data);
      setActiveCategory(resp.data[0].id);
      
    });
  }, []);
  
  // 当 activeCategory 改变时重新获取笔记
  useEffect(() => {
    getNotes({ categoryId: activeCategory });
  }, [activeCategory]);

  // 获取分类列表
  const getNotes = async (data) => {
    getNotePage(data).then((resp) => {
      setNoteList(resp.data.list);
    });
  };

  // 分类切换
  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    getNotes({ categoryId: key });
  };
  // 分类-笔记信息
  const items = categoryList.map((item) => (
    <CapsuleTabs.Tab title={item.name} key={item.id}>
      {noteList?.map((noteItem) => (
        <NoteCard data={noteItem} key={noteItem.id} />
      ))}
    </CapsuleTabs.Tab>
  ));

  return (
    <div className="note">
      <CapsuleTabs
        className="category"
        activeKey={activeCategory}
        onChange={(key) => {
          handleCategoryChange(key);
        }}
      >
        {items}
      </CapsuleTabs>
    </div>
  );
}
