#!/bin/bash
ssh eloviz@eloviz.com <<EOF
  cd ~/eloviz-vitrine
  git pull
  exit
EOF
