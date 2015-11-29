FROM java:openjdk-8-jdk

MAINTAINER Francois Achache <francois.achache@gmail.com>

ENV PROFILE tomcat

############### BEGIN COMMON PART ###############
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $PATH:$JAVA_HOME/bin
ENV MAVEN_VERSION 3.3.3

# Get maven
RUN curl -fsSL http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz | tar xzf - -C /usr/share \
  && mv /usr/share/apache-maven-$MAVEN_VERSION /usr/share/maven \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

ENV BRANCH docker
# Build ocelotds
RUN curl --silent --location --retry 3 https://github.com/ocelods/ocelotds.org/archive/$BRANCH.tar.gz | tar xz -C /tmp \
  && cd /tmp/ocelotds.org-$BRANCH/ocelotds.web && mvn package -P $PROFILE && mv /tmp/ocelotds.org-$BRANCH/ocelotds.web/target/ocelotds*.war /tmp/

# Clean
RUN rm -rf /tmp/ocelot-master && rm -rf /tmp/ocelotds.org-master && rm -f /usr/bin/mvn && rm -rf /usr/share/maven && rm -rf ~/.m2
############### END COMMON PART ###############

# Set the TOMCAT env variables
ENV TOMCAT_VERSION 8
ENV TOMCAT_RELEASE 8.0.28
ENV TOMCAT_URL http://www.eu.apache.org/dist/tomcat
ENV TOMCAT_HOME /usr/local/apache-tomcat-$TOMCAT_RELEASE
ENV PATH $PATH:$TOMCAT_HOME/bin

# Install tomcat
RUN curl -O $TOMCAT_URL/tomcat-$TOMCAT_VERSION/v$TOMCAT_RELEASE/bin/apache-tomcat-$TOMCAT_RELEASE.tar.gz \
    && tar xf apache-tomcat-$TOMCAT_RELEASE.tar.gz -C /usr/local \
    && rm apache-tomcat-$TOMCAT_RELEASE.tar.gz

# Define demo user
RUN echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" > $TOMCAT_HOME/conf/tomcat-users.xml \
 && echo "<tomcat-users xmlns=\"http://tomcat.apache.org/xml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" version=\"1.0\" xsi:schemaLocation=\"http://tomcat.apache.org/xml tomcat-users.xsd\">" >> $TOMCAT_HOME/conf/tomcat-users.xml \
 && echo "    <user password=\"demo\" roles=\"USERR\" username=\"demo\"/>" >> $TOMCAT_HOME/conf/tomcat-users.xml \
 && echo "</tomcat-users>" >> $TOMCAT_HOME/conf/tomcat-users.xml

# Deploy ocelotds
RUN mv /tmp/ocelot*.war $TOMCAT_HOME/webapps

# Expose the ports we're interested in
EXPOSE 8080

# Expose workspace
WORKDIR $TOMCAT_HOME

VOLUME $TOMCAT_HOME/webapps

# start tomcat
CMD ["catalina.sh", "run"]
