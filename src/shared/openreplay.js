/**
 * OpenReplay session-replay snippet for public Breathe Better Tonight documents.
 * The supplied project key is intentionally public; this module must never be
 * used by protected admin documents or authenticated preview pages.
 */
const OPENREPLAY_PROJECT_KEY = 'MfG8SUrX18iIjUStTeAp';

function renderOpenReplayHead() {
  return `<!-- OpenReplay Tracking Code for my first project -->
<script>
  var initOpts = {
    projectKey: "${OPENREPLAY_PROJECT_KEY}",
    // 0 - plain, 1 - obscured, 2 - ignored
    defaultInputMode: 2,
    obscureTextNumbers: false,
    obscureTextEmails: true,
  };
  var startOpts = { userID: "" };
  (function(A,s,a,y,e,r){
    r=window.OpenReplay=[e,r,y,[s-1, e]];
    s=document.createElement('script');s.src=A;s.async=!a;
    document.getElementsByTagName('head')[0].appendChild(s);
    r.start=function(v){r.push([0])};
    r.stop=function(v){r.push([1])};
    r.setUserID=function(id){r.push([2,id])};
    r.setUserAnonymousID=function(id){r.push([3,id])};
    r.setMetadata=function(k,v){r.push([4,k,v])};
    r.event=function(k,p,i){r.push([5,k,p,i])};
    r.issue=function(k,p){r.push([6,k,p])};
    r.isActive=function(){return false};
    r.getSessionToken=function(){};
  })("//static.openreplay.com/latest/openreplay.js",1,0,initOpts,startOpts);
</script>
<!-- End OpenReplay Tracking Code -->`;
}

module.exports = { OPENREPLAY_PROJECT_KEY, renderOpenReplayHead };
