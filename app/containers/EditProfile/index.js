/*
 *
 * EditProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import Helmet from 'react-helmet';
import styles from './styles.css';
import { submit } from './actions';
import { createStructuredSelector } from 'reselect';

import SectionTitle from 'components/SectionTitle';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';

import { selectGlobal } from 'containers/App/selectors';
import selectEditProfile from './selectors';

export class EditProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    submit: React.PropTypes.func,
    global: React.PropTypes.object,
    local: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    const userData = this.props.global.get('userData');

    this.state = {
      data: fromJS({
        firstName: userData.get('firstName'),
        lastName: userData.get('lastName'),
        headline:  userData.get('headline'),
        major:  userData.get('major'),
        university:  userData.get('university'),
        achievement:  userData.get('achievement'),
        project:  userData.get('project'),
        job:  userData.get('job'),
        linkedIn:  userData.get('linkedIn'),
        resume:  userData.get('resume'),
      }),
    };

    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(evt, field) {
    const value = evt.target.value;
    this.setState(({data}) => ({
      data: data.update(field, firstName => value)
    }));
  }

  render() {
    const data = this.state.data;
    console.log(this.props.local.message);
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
              <SectionTitle>Edit Profil</SectionTitle>
            </div>
            <div className="small-12 medium-5 columns">
              <h2>nama depan*</h2>
              <input type="text" placeholder="Ketik nama depan" value={data.get('firstName')} onChange={(evt) => this.changeInput(evt, 'firstName')} />
              <h3 style={{display: this.props.local.message.firstName ? 'block' : 'none'}}>{this.props.local.message.firstName}</h3>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>nama belakang</h2>
                <input type="text" placeholder="Ketik nama belakang" value={data.get('lastName')} onChange={(evt) => this.changeInput(evt, 'lastName')} />
              </div>
            </div>
            <div className="small-12 medium-10 columns">
              <h2>headline*</h2>
              <input type="text" placeholder="Ketik headline profil anda" value={data.get('headline')} onChange={(evt) => this.changeInput(evt, 'headline')} />
              <h3 style={{display: this.props.local.message.headline ? 'block' : 'none'}}>{this.props.local.message.headline}</h3>
            </div>
            <div className="small-12 columns" />
            <div className="small-12 medium-5 columns">
              <h2>Jurusan*</h2>
              <input type="text" placeholder="Ketik jurusanmu di sini" value={data.get('major')} onChange={(evt) => this.changeInput(evt, 'major')} />
              <h3 style={{display: this.props.local.message.major ? 'block' : 'none'}}>{this.props.local.message.major}</h3>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Universitas*</h2>
                <input type="text" placeholder="Ketik universitasmu di sini" value={data.get('university')} onChange={(evt) => this.changeInput(evt, 'university')} />
                <h3 style={{display: this.props.local.message.university ? 'block' : 'none'}}>{this.props.local.message.university}</h3>
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Pengalaman</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Jumlah Prestasi</h2>
                <input type="number" placeholder="Jumlah" value={data.get('achievement')} onChange={(evt) => this.changeInput(evt, 'achievement')} />
                <h2>Jumlah Proyek</h2>
                <input type="number" placeholder="Jumlah" value={data.get('project')} onChange={(evt) => this.changeInput(evt, 'project')} />
                <h2>Jumlah Organisasi/Pekerjaan</h2>
                <input type="number" placeholder="Jumlah" value={data.get('job')} onChange={(evt) => this.changeInput(evt, 'job')} />
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Profil Selanjutnya</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>URL LinkedIn</h2>
                <input type="text" placeholder="Ketik url disini" value={data.get('linkedIn')} onChange={(evt) => this.changeInput(evt, 'linkedIn')} />
                <h2>URL Resume*</h2>
                <input type="text" placeholder="Ketik url disini" value={data.get('resume')} onChange={(evt) => this.changeInput(evt, 'resume')} />
                <h3 style={{display: this.props.local.message.resume ? 'block' : 'none'}}>{this.props.local.message.resume}</h3>
              </div>
            </div>
            <div className="small-12 columns">
              <button onClick={() => this.props.submit(data.toJS())}>Simpan</button>
            </div>
            <div className="small-12 columns">
            </div>
          </div>
        </div>
        <Footer hasMargin={true} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
  local: selectEditProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    submit: (data) => dispatch(submit(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
