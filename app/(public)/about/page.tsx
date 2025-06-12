export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: "60vh" }}>
        <div className="hero-content">
          <div className="animate-fade-in-up">
            <div className="badge badge-purple mb-6">About Our School</div>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
              Kasikeu Boys High School
            </h1>
            <p className="hero-description" style={{ maxWidth: "48rem" }}>
              Shaping tomorrow's leaders through excellence in education, character development, and innovation since
              1985
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Our Foundation</div>
            <h2 className="section-title">Our Rich History</h2>
            <p className="section-description">Four decades of educational excellence and community impact</p>
          </div>

          <div className="grid grid-cols-1">
            <div className="card card-gradient-blue hover-lift">
              <div className="card-content" style={{ padding: "3rem" }}>
                <div className="flex items-center mb-6">
                  <div className="icon-wrapper icon-wrapper-blue">📚</div>
                  <h3 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>Founded in 1985</h3>
                </div>
                <div style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151" }}>
                  <p style={{ marginBottom: "1.5rem" }}>
                    Kasikeu Boys High School was established in 1985 with a vision to provide quality secondary
                    education to boys in the region. Founded by a group of visionary community leaders and educators,
                    the school began with just 120 students and has grown to become one of the leading secondary schools
                    in the area.
                  </p>
                  <p style={{ marginBottom: "1.5rem" }}>
                    Over the years, we have maintained our commitment to academic excellence while adapting to modern
                    educational needs. Our graduates have gone on to excel in various fields, including medicine,
                    engineering, law, business, and public service, making significant contributions to society.
                  </p>
                  <p>
                    Today, Kasikeu Boys High School stands as a beacon of educational excellence, character development,
                    and leadership training, continuing to shape young minds for a better tomorrow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-green">Our Foundation</div>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-description">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-4">
            <div className="card card-gradient-blue hover-lift">
              <div className="card-content text-center">
                <div className="icon-wrapper icon-wrapper-blue">📚</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Excellence</h3>
                <p style={{ color: "#374151", lineHeight: "1.7" }}>
                  We strive for the highest standards in academics, character, and all endeavors.
                </p>
              </div>
            </div>

            <div className="card card-gradient-green hover-lift">
              <div className="card-content text-center">
                <div className="icon-wrapper icon-wrapper-green">🎯</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Integrity</h3>
                <p style={{ color: "#374151", lineHeight: "1.7" }}>
                  We uphold honesty, transparency, and moral uprightness in all our actions.
                </p>
              </div>
            </div>

            <div className="card card-gradient-purple hover-lift">
              <div className="card-content text-center">
                <div className="icon-wrapper icon-wrapper-purple">👥</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Respect</h3>
                <p style={{ color: "#374151", lineHeight: "1.7" }}>
                  We value diversity, treat everyone with dignity, and foster inclusive community.
                </p>
              </div>
            </div>

            <div className="card card-gradient-orange hover-lift">
              <div className="card-content text-center">
                <div className="icon-wrapper icon-wrapper-orange">🏆</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Innovation</h3>
                <p style={{ color: "#374151", lineHeight: "1.7" }}>
                  We embrace creativity, critical thinking, and modern approaches to learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School at a Glance */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-purple">Quick Facts</div>
            <h2 className="section-title">School at a Glance</h2>
            <p className="section-description">Key facts and figures about our institution</p>
          </div>

          <div className="grid grid-cols-4">
            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#2563eb", marginBottom: "1rem" }}>800+</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Students Enrolled</h4>
                <p style={{ color: "#6b7280" }}>Bright minds learning together</p>
              </div>
            </div>

            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#059669", marginBottom: "1rem" }}>45</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Teaching Staff</h4>
                <p style={{ color: "#6b7280" }}>Dedicated educators</p>
              </div>
            </div>

            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#7c3aed", marginBottom: "1rem" }}>38</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Years of Excellence</h4>
                <p style={{ color: "#6b7280" }}>Proven track record</p>
              </div>
            </div>

            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#ea580c", marginBottom: "1rem" }}>95%</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>University Success</h4>
                <p style={{ color: "#6b7280" }}>Admission rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-blue">Our Purpose</div>
            <h2 className="section-title">Mission & Vision</h2>
            <p className="section-description">The driving force behind our educational excellence</p>
          </div>

          <div className="grid grid-cols-2">
            <div className="card card-gradient-blue hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-blue">🎯</div>
                  <h3 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>Our Mission</h3>
                </div>
              </div>
              <div className="card-content">
                <p style={{ color: "#374151", lineHeight: "1.8", fontSize: "1.125rem" }}>
                  To provide quality education that nurtures academic excellence, character development, and leadership
                  skills, preparing our students to become responsible citizens and future leaders who contribute
                  positively to society.
                </p>
              </div>
            </div>

            <div className="card card-gradient-purple hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-purple">🏆</div>
                  <h3 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>Our Vision</h3>
                </div>
              </div>
              <div className="card-content">
                <p style={{ color: "#374151", lineHeight: "1.8", fontSize: "1.125rem" }}>
                  To be a leading institution of learning that produces well-rounded individuals equipped with
                  knowledge, skills, and values necessary for success in higher education and life, while maintaining
                  the highest standards of academic and moral excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
