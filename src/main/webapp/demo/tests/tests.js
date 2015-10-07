'use strict';
var nbMsgToBroadcast = 500;
ocelotController.cacheManager.clearCache();
ocelotController.addOpenListener(function () {
   QUnit.module("UnreachableServices");
   QUnit.test(".getVoid()", function (assert) {
      var done = assert.async(), srv = {
         ds: "org.ocelotds.test.UnreachableServices",
         getVoid: function () {
            var op = "getVoid";
            var id = "9aa2b06f2181c16f6ce2480967bd6c9d_" + JSON.stringify([]).md5();
            return OcelotPromiseFactory.createPromise(this.ds, id, op, [], []);
         }
      };
      srv.getVoid().event(function (evt) {
         assert.equal(evt.type, "FAULT", "" + evt.response.classname + " : " + evt.response.message);
         done();
      });
   });
   var srv = new TestServices();
   QUnit.module("TestServices");
   QUnit.test(".getVoid()", function (assert) {
      var done = assert.async();
      srv.getVoid().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         done();
      });
   });
   QUnit.test(".getString()", function (assert) {
      var done = assert.async();
      srv.getString().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, "FOO");
         done();
      });
   });
   QUnit.test(".getNum()", function (assert) {
      var done = assert.async();
      srv.getNum().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, 1);
         done();
      });
   });
   QUnit.test(".getNumber()", function (assert) {
      var done = assert.async();
      srv.getNumber().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, 2);
         done();
      });
   });
   QUnit.test(".getBool()", function (assert) {
      var done = assert.async();
      srv.getBool().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, true);
         done();
      });
   });
   QUnit.test(".getBoolean()", function (assert) {
      var done = assert.async();
      srv.getBoolean().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, false);
         done();
      });
   });
   QUnit.test(".getDate()", function (assert) {
      var done = assert.async();
      var now = new Date();
      setTimeout(function () {
         srv.getDate().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            assert.ok(new Date(evt.response).getDate() === now.getDate(), "Same day...");
            done();
         });
      }, 50);
   });
   QUnit.test(".getResult()", function (assert) {
      var done = assert.async();
      srv.getResult().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, {"integer": 5});
         done();
      });
   });
   QUnit.test(".getCollectionInteger()", function (assert) {
      var i, expected = [], done = assert.async();
      for (i = 1; i < 5; i++) {
         expected.push(i);
      }
      srv.getCollectionInteger().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".getCollectionResult()", function (assert) {
      var i, expected = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         expected.push({"integer": 5});
      }
      srv.getCollectionResult().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".getCollectionOfCollectionResult()", function (assert) {
      var i, j, expected = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         var result = [];
         expected.push(result);
         for (j = 0; j < 4; j++) {
            result.push({"integer": 5});
         }
      }
      srv.getCollectionOfCollectionResult().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".getMapResult()", function (assert) {
      var i, expected = {}, done = assert.async();
      for (i = 1; i < 5; i++) {
         expected["" + i] = {"integer": 5};
      }
      srv.getMapResult().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithNum(i)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithNum_1";
      srv.methodWithNum(1).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithNumber(i)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithNumber_1";
      srv.methodWithNumber(1).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithBool(true)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithBool_true";
      srv.methodWithBool(true).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithBool(false)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithBool_false";
      srv.methodWithBool(false).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithBoolean(false)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithBoolean_false";
      srv.methodWithBoolean(false).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithBoolean(true)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithBoolean_true";
      srv.methodWithBoolean(true).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithDate(d)", function (assert) {
      var expected, d, done = assert.async();
      d = new Date();
      expected = "methodWithDate_" + d.getTime();
      srv.methodWithDate(d.getTime()).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithResult(r)", function (assert) {
      var expected, r, done = assert.async();
      r = {"integer": 5};
      expected = "methodWithResult_" + r.integer;
      srv.methodWithResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithArrayInteger(a)", function (assert) {
      var expected, r, done = assert.async();
      r = [1, 2, 3, 4, 5];
      expected = "methodWithArrayInteger_" + r.length;
      srv.methodWithArrayInteger(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithCollectionInteger(c)", function (assert) {
      var expected, r, done = assert.async();
      r = [1, 2, 3, 4, 5];
      expected = "methodWithCollectionInteger_" + r.length;
      srv.methodWithCollectionInteger(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithArrayResult(c)", function (assert) {
      var i, expected, r = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         r.push({"integer": 5});
      }
      expected = "methodWithArrayResult_" + r.length;
      srv.methodWithArrayResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithCollectionResult(c)", function (assert) {
      var i, expected, r = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         r.push({"integer": 5});
      }
      expected = "methodWithCollectionResult_" + r.length;
      srv.methodWithCollectionResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithMapResult(m)", function (assert) {
      var i, expected, r = {}, done = assert.async();
      for (i = 1; i < 5; i++) {
         r["" + i] = {"integer": 5};
      }
      expected = "methodWithMapResult_4";
      srv.methodWithMapResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithCollectionOfCollectionResult(c)", function (assert) {
      var i, j, expected, r = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         var result = [];
         r.push(result);
         for (j = 0; j < 4; j++) {
            result.push({"integer": 5});
         }
      }
      expected = "methodWithCollectionOfCollectionResult_" + r.length;
      srv.methodWithCollectionOfCollectionResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithManyParameters(a, b, c, d)", function (assert) {
      var a, b, c, d, expected, done = assert.async();
      a = "text", b = 5, c = {"integer": 5}, d = ["a", "b"];
      expected = "methodWithManyParameters a=" + a + " - b=" + b + " - c=" + c.integer + " - d:" + d.length;
      srv.methodWithManyParameters(a, b, c, d).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithAlmostSameSignature(s)", function (assert) {
      var expected, done = assert.async();
      expected = "String";
      srv.methodWithAlmostSameSignature("text").event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithAlmostSameSignature(i)", function (assert) {
      var expected, done = assert.async();
      expected = "Integer";
      srv.methodWithAlmostSameSignature(5).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodThatThrowException()", function (assert) {
      var done = assert.async();
      srv.methodThatThrowException().event(function (evt) {
         assert.equal(evt.type, "FAULT");
         assert.equal(evt.response.classname, "org.ocelotds.tests.MethodException");
         done();
      });
   });
   QUnit.test(".methodCached()", function (assert) {
      var expected, done = assert.async();
      srv.methodCached().event(function (evt) {
         assert.equal(evt.type, "RESULT", "Receive result : " + expected + " from server and put in cache.");
         expected = evt.response.length;
         srv.methodCached().event(function (evt) {
            assert.equal(evt.response.length, expected, "Receive result from cache : " + evt.response.length);
            done();
         });
      });
   });
   QUnit.test(".methodRemoveCache()", function (assert) {
      ocelotController.cacheManager.clearCache();
      var expected, done = assert.async();
      srv.methodCached().event(function (evt) {
         expected = evt.response.length;
         assert.equal(evt.type, "RESULT", "Receive result : " + expected + " from server and put in cache.");
         srv.methodCached().event(function (evt) {
            assert.equal(evt.response.length, expected, "Receive result from cache : " + evt.response.length);
            srv.methodRemoveCache().event(function (evt) {
               assert.equal(evt.type, "RESULT", "Cache removed.");
               srv.methodCached().event(function (evt) {
                  assert.notEqual(evt.response.length, expected, "Receive result : " + evt.response.length + " from server");
                  done();
               });
            });
         });
      });
   });
   QUnit.test(".methodRemoveAllCache()", function (assert) {
      ocelotController.cacheManager.clearCache();
      var expected, done = assert.async();
      srv.methodCached().event(function (evt) {
         expected = evt.response.length;
         assert.equal(evt.type, "RESULT", "Receive result : " + expected + " from server and put in cache.");
         srv.methodCached().event(function (evt) {
            assert.equal(evt.response.length, expected, "Receive result from cache : " + evt.response.length);
            srv.methodRemoveAllCache().event(function (evt) {
               assert.equal(evt.type, "RESULT", "All Cache removed.");
               srv.methodCached().event(function (evt) {
                  assert.notEqual(evt.response.length, expected, "Receive result " + evt.response.length + " from server");
                  done();
               });
            });
         });
      });
   });
   QUnit.test(".closeAndOpen()", function (assert) {
      ocelotController.close();
      var timer, done = assert.async();
      srv.getVoid().event(function (evt) {
         assert.equal(evt.type, "FAULT", "WebSocket should be closed");
      });
      timer = setTimeout(function () {
         assert.ok(false, "WebSocket doesn't open");
         done();
      }, 500);
      ocelotController.addOpenListener(function () {
         window.clearTimeout(timer);
         srv.getVoid().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            done();
         });
      });
      ocelotController.open();
   });
   QUnit.test(".onMessage()", function (assert) {
      var timer, done = assert.async(),
         sub = new Subscriber("mytopic");
      assert.equal(sub.topic, "mytopic", "topic name accessible");
      sub.event(function (evt) {
         assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
         srv.publish("mytopic", 1).event(function (evt) {
            assert.equal(evt.type, "RESULT", "Call publish method : ok.");
         });
      }).message(function (msg) {
         assert.equal(msg, "Message From server 1", "Receive message in 'mytopic' : ok.");
         sub.unsubscribe().event(function (evt) {
            assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
            window.clearTimeout(timer);
            done();
         });
      });
      timer = setTimeout(function () {
         assert.equal(0, 1, "Receive 0 messages");
         sub.unsubscribe("mytopic").event(function (evt) {
            assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
            done();
         });
      }, 500);
   });
   QUnit.test(".onMessages()", function (assert) {
      var sub, result = 0, expected = nbMsgToBroadcast, timer, done, params, i, query;
      query = location.search;
      params = query.split("&");
      for (i = 0; i < params.length; i++) {
         var param = params[i].replace("?", "");
         var keyval = param.split("=");
         if (keyval.length === 2) {
            if (keyval[0] === "nbmsg") {
               expected = parseInt(keyval[1]);
            }
         }
      }
      done = assert.async();
      sub = new Subscriber("mytopic").event(function (evt) {
         assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
         srv.publish("mytopic", expected).event(function (evt) {
            assert.equal(evt.type, "RESULT", "Call publish(" + expected + ") method : ok.");
         });
      }).message(function (msg) {
         result++;
         assert.ok(true, "" + msg + " : (" + result + ")");
         if (result === expected) {
            assert.equal(result, expected, "Receive " + result + "/" + expected + " messages");
            sub.unsubscribe().event(function (evt) {
               window.clearTimeout(timer);
               assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
               done();
            });
         }
      });
      timer = setTimeout(function () {
         assert.equal(0, expected, "Receive 0/" + expected + " messages");
         sub.unsubscribe().event(function (evt) {
            assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
            done();
         });
      }, 50 * expected);
   });
   QUnit.test(".testGlobalTopic()", function (assert) {
      var sub, timer, topic = "GlobalTopic", expected = "my message", done = assert.async();
      sub = new Subscriber(topic).event(function (evt) {
         assert.equal(evt.type, "RESULT", "Subscription to '" + topic + "' : ok.");
         srv.sendToGlobalTopic(expected).event(function (evt) {
            assert.equal(evt.type, "RESULT", "Call sendToGlobalTopic(" + expected + ") method : ok.");
            sub.message(function (msg) {
               window.clearTimeout(timer);
               assert.equal(msg, expected, "Receive msg in GlobalTopic : " + msg);
               done();
            });
         });
         timer = setTimeout(function () {
            assert.ok(false, "Timeout, didn't receive msg in " + topic + " subscriber.");
            done();
         }, 200);
      });
   });
   QUnit.test(".testSpecificTopic()", function (assert) {
      var sub, timer, topic = "MyTopic", expected = "my message", done = assert.async();
      sub = new Subscriber(topic).event(function (evt) {
         assert.equal(evt.type, "RESULT", "Subscription to '" + topic + "' : ok.");
         srv.sendToSpecificTopic(expected, topic).event(function (evt) {
            assert.equal(evt.type, "RESULT", "Call sendToSpecificTopic(" + expected + ", " + topic + ")");
            sub.message(function (msg) {
               window.clearTimeout(timer);
               assert.equal(msg, expected, "Receive msg in SpecificTopic(" + topic + ") : " + msg);
               sub.unsubscribe();
               done();
            });
         });
         timer = setTimeout(function () {
            assert.ok(false, "Timeout, didn't receive msg in " + topic + " subscriber.");
            sub.unsubscribe();
            done();
         }, 200);
      });
   });
   QUnit.test(".testGlobalTopicAccess()", function (assert) {
      var sub, done = assert.async();
      srv.setGlobalTopicAccess(false).then(function () {
         new Subscriber("GlobalTopic").event(function (evt) {
            assert.equal(evt.type, "FAULT", "Subscription to 'GlobalTopic' failed : ok.");
            new Subscriber("mytopic").event(function (evt) {
               assert.equal(evt.type, "FAULT", "Subscription to 'mytopic' failed : ok.");
               srv.setGlobalTopicAccess(true);
               sub = new Subscriber("mytopic").event(function (evt) {
                  assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
                  sub.unsubscribe();
                  done();
               });
            });
         });
      });
   });
   QUnit.test(".testSpecificTopicAccess()", function (assert) {
      var sub, done = assert.async();
      srv.setSpecificTopicAccess(false).then(function () {
         new Subscriber("mytopic").event(function (evt) {
            assert.equal(evt.type, "FAULT", "Subscription to 'GlobalTopic' failed : ok.");
            sub = new Subscriber("GlobalTopic").event(function (evt) {
               assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
               srv.setSpecificTopicAccess(true);
               sub.unsubscribe();
               done();
            });
         });
      });
   });
   QUnit.test(".testGetCDIPrincipalName()", function (assert) {
      var login, done = assert.async();
      srv.getCDIPrincipalName().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         login = evt.response;
         assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
         done();
      });
   });
   /**
    * EJBStateless
    */
   QUnit.module("EJBStateless");
   var srv1 = new EJBStateless();
   QUnit.test(".testGetDate()", function (assert) {
      var r1, r2, done = assert.async();
      srv1.getDate().event(function (evt) {
         r1 = evt.response;
         assert.equal(evt.type, "RESULT", "r1 = "+new Date(r1).toString());
      });
      srv1.getDate().event(function (evt) {
         r2 = evt.response;
         assert.equal(evt.type, "RESULT", "r2 = "+new Date(r2).toString());
      });
      setTimeout(function () {
         assert.equal(r1, r2);
         done();
      }, 4000);
   });
   QUnit.test(".testGetEJBPrincipalName()", function (assert) {
      var done = assert.async();
      var resultCount = 0;
      var okCount = 0;
      var login = null;
      srv1.getEJBPrincipalName().event(function (evt) {
         login = evt.response;
         var getName = function () {
            srv1.getEJBPrincipalName().event(function (evt) {
               if (evt.response === login) okCount++;
               resultCount++;
               if (resultCount < 50) getName();
            });
         };
         getName();
      });
      setTimeout(function () {
         assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
         assert.equal(okCount, 50, "50 response with login = "+login);
         done();
      }, 2000);
   });
   QUnit.test(".testIsUserInRoleTrue()", function (assert) {
      var done = assert.async();
      srv1.isUserInRole("USERR").event(function (evt) {
         assert.equal(evt.type, "RESULT", "User should be in role : USERR");
         assert.equal(evt.response, true);
         done();
      });
   });
   QUnit.test(".testIsUserInRoleFalse()", function (assert) {
      var done = assert.async();
      srv1.isUserInRole("ADMINR").event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, false);
         done();
      });
   });
   QUnit.test(".callAuthorized()", function (assert) {
      var done = assert.async();
      srv1.callAuthorized().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         done();
      });
   });
   QUnit.test(".callUnauthorized()", function (assert) {
      var done = assert.async();
      srv1.callUnauthorized().event(function (evt) {
         assert.equal(evt.type, "FAULT");
         done();
      });
   });
   
   QUnit.module("OcelotServices");
   var srv2 = new OcelotServices();
   QUnit.test(".getLocale()", function (assert) {
      ocelotController.cacheManager.clearCache();
      var done = assert.async();
      srv2.getLocale().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response.language, "fr");
         assert.equal(evt.response.country, "FR");
         done();
      });
   });
   QUnit.test(".setLocale()", function (assert) {
      var done = assert.async(), func;
      func = function (evt) {
         ocelotController.cacheManager.removeEventListener("remove", func);
         srv2.getLocale().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            assert.equal(evt.response.language, "en");
            assert.equal(evt.response.country, "US");
            srv2.setLocale({"language": "fr", "country": "FR"}).event(function (evt) {
               assert.equal(evt.type, "RESULT");
               done();
            });
         });
      };
      ocelotController.cacheManager.addEventListener("remove", func);
      srv2.setLocale({"language": "en", "country": "US"}).event(function (evt) {
         assert.equal(evt.type, "RESULT");
      });
   });
});
