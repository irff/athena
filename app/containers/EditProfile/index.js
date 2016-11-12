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
        first_name: userData.get('first_name'),
        last_name: userData.get('last_name'),
        headline:  userData.get('headline'),
        major:  userData.get('major'),
        university: userData.get('university'),
        experiences: {
          achievement_num: userData.getIn(['experiences', 'achievement_num']),
          project_num: userData.getIn(['experiences', 'project_num']),
          work_num: userData.getIn(['experiences', 'work_num']),
        },
        linkedin_url: userData.get('linkedin_url'),
        resume_url: userData.get('resume_url'),
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

  changeExperience(evt, field) {
    const value = evt.target.value;
    this.setState(({data}) => ({
      data: data.updateIn(['experiences', field], firstName => value)
    }));
  }

  render() {
    const data = this.state.data;
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
              <input type="text" placeholder="Ketik nama depan" value={data.get('first_name')} onChange={(evt) => this.changeInput(evt, 'first_name')} />
              <h3 style={{display: this.props.local.message.firstName ? 'block' : 'none'}}>{this.props.local.message.firstName}</h3>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>nama belakang</h2>
                <input type="text" placeholder="Ketik nama belakang" value={data.get('last_name')} onChange={(evt) => this.changeInput(evt, 'last_name')} />
              </div>
            </div>
            <div className="small-12 medium-10 columns">
              <h2>headline*</h2>
              <input type="text" placeholder="Ketik headline profil anda" value={data.get('headline') === 'iniDefaultEntryQuint' ? '' : data.get('headline')} onChange={(evt) => this.changeInput(evt, 'headline')} />
              <h3 style={{display: this.props.local.message.headline ? 'block' : 'none'}}>{this.props.local.message.headline}</h3>
            </div>
            <div className="small-12 columns" />
            <div className="small-12 medium-5 columns">
              <h2>Jurusan*</h2>
              <input type="text" placeholder="Ketik jurusanmu di sini" value={data.get('major') === 'iniDefaultEntryQuint' ? '' : data.get('major')} onChange={(evt) => this.changeInput(evt, 'major')} />
              <h3 style={{display: this.props.local.message.major ? 'block' : 'none'}}>{this.props.local.message.major}</h3>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Universitas*</h2>
                <input type="text" placeholder="Ketik universitasmu di sini" value={data.get('university') === 'iniDefaultEntryQuint' ? '' : data.get('university')} onChange={(evt) => this.changeInput(evt, 'university')} />
                <h3 style={{display: this.props.local.message.university ? 'block' : 'none'}}>{this.props.local.message.university}</h3>
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Pengalaman</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Jumlah Prestasi</h2>
                <input type="number" min={0} placeholder="Jumlah" value={data.getIn(['experiences', 'achievement_num'])} onChange={(evt) => this.changeExperience(evt, 'achievement_num')} />
                <h2>Jumlah Proyek</h2>
                <input type="number" min={0} placeholder="Jumlah" value={data.getIn(['experiences', 'project_num'])} onChange={(evt) => this.changeExperience(evt, 'project_num')} />
                <h2>Jumlah Organisasi/Pekerjaan</h2>
                <input type="number" min={0} placeholder="Jumlah" value={data.getIn(['experiences', 'work_num'])} onChange={(evt) => this.changeExperience(evt, 'work_num')} />
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Profil Selanjutnya</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>URL LinkedIn</h2>
                <input type="text" placeholder="Ketik url disini" value={data.get('linkedin_url')} onChange={(evt) => this.changeInput(evt, 'linkedin_url')} />
                <h2>URL Resume*</h2>
                <input type="text" placeholder="Ketik url disini" value={data.get('resume_url') === 'http://iniDefaultEntryQui.nt' ? '' : data.get('resume_url')} onChange={(evt) => this.changeInput(evt, 'resume_url')} />
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
