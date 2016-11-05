/*
 *
 * FilterBar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectFilterBar from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Button from 'components/Button';

export class FilterBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.filterBar}>
        <div className="row expanded">
          <div className="small-12 columns">
            <TextInput placeholder="cari internship" autoFocus={true} />
          </div>
          <div className="small-10 columns">
            <div className={styles.secondLevel}>
              <Select>
                <option>Filter 1</option>
              </Select>
            </div>
          </div>
          <div className="small-2 columns">
            <Button className={styles.search}>CARI</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectFilterBar();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
