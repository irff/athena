/*
 *
 * EditProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectEditProfile from './selectors';
import styles from './styles.css';

import SectionTitle from 'components/SectionTitle';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';

export class EditProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <Helmet
        title="EditProfile"
        meta={[
          { name: 'description', content: 'Description of EditProfile' },
        ]}
      />
        <Navbar />
        <div className={styles.editProfile}>
          <div className="row">
            <div className="small-12 columns">
              <SectionTitle>Edit Profile</SectionTitle>
            </div>
            <div className="small-12 medium-4 columns">
              <h2>nama depan</h2>
            </div>
            <div className="small-12 medium-4 medium-offset-1 columns end">
              <h2>nama depan</h2>
            </div>
          </div>
        </div>
        <Footer hasMargin={true} />
      </div>
    );
  }
}

const mapStateToProps = selectEditProfile();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
