import React, { useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import { useTranslation } from 'positive-store';

import { appMaxWidth, breakpoint, color, spacing } from 'theme';
import Breadcrumb from 'components/Breadcrumb';
import Link from 'components/Link';
import { LessonContext } from 'context/LessonContext/LessonContext';

const MenuBar: React.FunctionComponent = () => {
  const { getCategory, getLesson } = useContext(LessonContext);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const categoryId = pathname.indexOf('/learn/') === 0 ? pathname.split('/')[2] : undefined;
  const lessonId = categoryId ? pathname.split('/')[3] : undefined;

  const category = categoryId ? getCategory(categoryId) : undefined;
  const lesson = lessonId ? getLesson(lessonId) : undefined;

  const breadCrumbs = [<Link to={'/learn'}>{t('route.learn')}</Link>];

  if (lesson) {
    breadCrumbs.push(<Link to={`/learn/${category.id}`}>{category.header}</Link>);
    breadCrumbs.push(lesson.header);
  } else if (category) {
    breadCrumbs.push(category.header);
  }

  return breadCrumbs.length > 1 ? (
    <Wrapper>
      <MenuBarContent>
        <Breadcrumb crumbs={breadCrumbs} />
      </MenuBarContent>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  background: ${color('white')};
  border-top: 1px solid ${color('lightGrey')};
  left: 0;
  min-height: ${spacing('xxl')};
  position: fixed;
  top: ${spacing('navbar')};
  width: 100%;
  z-index: 1;

  @media (min-width: ${breakpoint('sm')}) {
    border-bottom: 1px solid ${color('lightGrey')};
    height: ${spacing('navbar')};
    position: sticky;
    top: ${spacing('navbar')};
  }
`;

const MenuBarContent = styled.header`
  height: 100%;
  margin: 0 auto;
  max-width: ${appMaxWidth};
  padding: 0 ${spacing('lg')};
  width: 100%;
`;

export default MenuBar;
