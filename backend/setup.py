from setuptools import setup, find_packages

setup(
    name='backend',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Django>=3.2',
    ],
)
