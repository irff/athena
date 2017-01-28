/*
 *
 * EditProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import styles from './styles.css';
import { submit, changeUserData, dataModified, dataUnmodified } from './actions';
import { fetchUserData } from 'containers/UserAccess/actions';
import { createStructuredSelector } from 'reselect';

import { loading, loadingDone } from 'containers/App/actions';
import SectionTitle from 'components/SectionTitle';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';

import { selectGlobal } from 'containers/App/selectors';
import selectEditProfile from './selectors';

export class EditProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    submit: React.PropTypes.func,
    global: React.PropTypes.object,
    local: React.PropTypes.object,
    loading: React.PropTypes.func,
    loadingDone: React.PropTypes.func,
    fetchUserData: React.PropTypes.func,
    changeUserData: React.PropTypes.func,
    dataModified: React.PropTypes.func,
    dataUnmodified: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    const userData = this.props.global.get('userData');
    this.state = {
      data: fromJS({
        first_name: userData.get('first_name'),
        last_name: userData.get('last_name'),
        headline: userData.get('headline'),
        major: userData.get('major'),
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
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount() {
    this.props.loadingDone();
    this.props.dataUnmodified();
    const token = this.getCookie('token');
    const studentId = this.getCookie('student_id');

    if (this.props.global.get('token') === '' || this.props.global.get('id') === '') {
      this.props.loading();
      if (token !== '' && studentId !== '') {
        this.props.fetchUserData({ token, student_id: studentId });
      } else {
        this.props.push('/mahasiswa/login');
      }
    } else {
      this.props.changeUserData(this.props.global.get('userData'));
    }

    document.addEventListener('keyup', this.onEnter);
  }

  componentWillUnmount() {
    this.props.loading();
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      this.props.submit(this.props.local.data);
    }
  }

  getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  changeInput(evt, field) {
    const value = evt.target.value;
    const data = this.props.local.data;
    data[field] = value;
    this.props.changeUserData(fromJS(data));
    this.props.dataModified();
  }

  changeExperience(evt, field) {
    const value = evt.target.value;
    const data = this.props.local.data;
    if (data.experiences === '') {
      data.experiences = {
        achievement_num: 0,
        project_num: 0,
        work_num: 0,
      };
    }

    data.experiences[field] = value;
    this.props.changeUserData(fromJS(data));
    this.props.dataModified();
  }

  render() {
    const data = this.props.local.data ? fromJS(this.props.local.data) : fromJS({});
    return (
      <div>
        <Helmet
          title="Ubah Profil - Quint.id"
          meta={[
            { name: 'description', content: 'Ubah Profil - Quint.id' },
          ]}
        />
        <Navbar onChangeConfirmation={this.props.local.modified} />
        <div className={styles.editProfile}>
          <div className="row">
            <div className="small-12 columns">
              <SectionTitle>Ubah Profil</SectionTitle>
            </div>
            <div className="small-12 medium-5 columns">
              <h2>nama depan*</h2>
              <input type="text" placeholder="Ketik nama depan" value={data.get('first_name')} onChange={(evt) => this.changeInput(evt, 'first_name')} />
              <h3 style={{ display: this.props.local.message.firstName ? 'block' : 'none' }}>{this.props.local.message.firstName}</h3>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>nama belakang</h2>
                <input type="text" placeholder="Ketik nama belakang" value={data.get('last_name')} onChange={(evt) => this.changeInput(evt, 'last_name')} />
              </div>
            </div>
            <div className="small-12 medium-10 columns">
              <h2>headline*</h2>
              <input className={styles.headline} type="text" placeholder="Headline profil anda. ex: Data Scientist Intern at Facebook Menlo Park" value={data.get('headline') === 'iniDefaultEntryQuint' ? '' : data.get('headline')} onChange={(evt) => this.changeInput(evt, 'headline')} />
              <h3 style={{ display: this.props.local.message.headline ? 'block' : 'none' }}>{this.props.local.message.headline}</h3>
            </div>
            <div className="small-12 columns" />
            <div className="small-12 medium-5 columns">
              <h2>Jurusan*</h2>
              <input type="text" placeholder="Ketik jurusanmu di sini" value={data.get('major') === 'iniDefaultEntryQuint' ? '' : data.get('major')} onChange={(evt) => this.changeInput(evt, 'major')} />
              <h3 style={{ display: this.props.local.message.major ? 'block' : 'none' }}>{this.props.local.message.major}</h3>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Universitas*</h2>
                <input type="text" placeholder="Ketik universitasmu di sini" value={data.get('university') === 'iniDefaultEntryQuint' ? '' : data.get('university')} onChange={(evt) => this.changeInput(evt, 'university')} />
                <h3 style={{ display: this.props.local.message.university ? 'block' : 'none' }}>{this.props.local.message.university}</h3>
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Pengalaman</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Jumlah Prestasi</h2>
                <input type="number" min={0} placeholder="Jumlah prestasi anda, cth: 7" value={data.getIn(['experiences', 'achievement_num'])} onChange={(evt) => this.changeExperience(evt, 'achievement_num')} />
                <h3 style={{ display: this.props.local.message.achievementNum ? 'block' : 'none' }}>{this.props.local.message.achievementNum}</h3>
                <h2>Jumlah Proyek</h2>
                <input type="number" min={0} placeholder="Jumlah proyek anda, cth: 3" value={data.getIn(['experiences', 'project_num'])} onChange={(evt) => this.changeExperience(evt, 'project_num')} />
                <h3 style={{ display: this.props.local.message.projectNum ? 'block' : 'none' }}>{this.props.local.message.projectNum}</h3>
                <h2>Jumlah Pekerjaan</h2>
                <input type="number" min={0} placeholder="Jumlah pengalaman pekerjaan anda, cth: 4" value={data.getIn(['experiences', 'work_num'])} onChange={(evt) => this.changeExperience(evt, 'work_num')} />
                <h3 style={{ display: this.props.local.message.workNum ? 'block' : 'none' }}>{this.props.local.message.workNum}</h3>
              </div>
            </div>
            <div className="small-12 columns">
              <h2>LinkedIn dan Resume</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>URL LinkedIn</h2>
                <input type="text" placeholder="Ketik url LinkedIn anda disini" value={data.get('linkedin_url')} onChange={(evt) => this.changeInput(evt, 'linkedin_url')} />
                <h3 style={{ display: this.props.local.message.linkedin ? 'block' : 'none' }}>{this.props.local.message.linkedin}</h3>
                <h2>URL Resume*</h2>
                <input type="text" placeholder="Ketik url resume disini" value={data.get('resume_url') === 'http://iniDefaultEntryQui.nt' ? '' : data.get('resume_url')} onChange={(evt) => this.changeInput(evt, 'resume_url')} />
                <h3 style={{ display: this.props.local.message.resume ? 'block' : 'none' }}>{this.props.local.message.resume}</h3>
              </div>
            </div>
            <div className="small-12 columns">
              <button onClick={() => this.props.submit(data.toJS())}>Simpan</button>
            </div>
            <div className="small-12 columns">
            </div>
          </div>
        </div>
        <Footer hasMargin />
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
    loading: () => dispatch(loading()),
    loadingDone: () => dispatch(loadingDone()),
    fetchUserData: (data) => dispatch(fetchUserData(data)),
    push: (url) => dispatch(push(url)),
    changeUserData: (data) => dispatch(changeUserData(data)),
    dataModified: () => dispatch(dataModified()),
    dataUnmodified: () => dispatch(dataUnmodified()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
