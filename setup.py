from setuptools import setup

setup(name='MyApp',
      version='1.1',
      description='OpenShift App',
      author='Per Nordfors',
      author_email='perno902@student.liu.se',
      url='http://www.python.org/sigs/distutils-sig/',
      install_requires=['Flask==0.7.2', 'MarkupSafe', 'Flask-SQLAlchemy==0.16', 'Flask-Login==0.2.11', 'requests==2.6.0',
                        'uuid', 'datetime', 'requests[security]'],
     )
