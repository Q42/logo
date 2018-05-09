source compile.sh

gsutil -h "Content-Type:application/javascript" \
       -h "Content-Encoding:gzip" \
       -h "Cache-Control:public, max-age=3600" cp -r q42.js.gz \
       gs://static.q42.nl/q42.js.gz

gsutil -h "Content-Type:application/javascript" \
      -h "Content-Encoding:gzip" \
      -h "Cache-Control:public, max-age=3600" cp -r q42.js.gz \
      gs://static.q42.nl/q42.js
